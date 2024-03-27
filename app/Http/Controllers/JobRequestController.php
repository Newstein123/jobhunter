<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Resources\JobRequestResource;
use App\Jobs\SendMail;
use App\Models\CustomMail;
use App\Models\Employer;
use App\Models\JobRequest;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $perpage = $request->perpage ?? 10;
        $job_portal = $request->job_portal;
        $query = Employer::where('status', 0)->select('id', 'name');

        if($job_portal) {
            $query = $query->where('job_portal', $job_portal);
        } else {
            $query->where('job_portal', '!=', 'Database');
        }

        $mails = CustomMail::select('id', 'mail_address')->latest('id')->get();           
        $employers = $query->latest('id')->get();
        $resumes = Resume::select('id', 'name')->latest('id')->get();

        $query = JobRequest::with(['sender', 'receiver', 'resume']);

        // company_name
        if($request->company_name) {
            $query = $query->whereHas('receiver', function($q) use($request) {
                $q->where('name', 'like', '%' . $request->company_name. '%');
            });
        }
        // sender mail
        if($request->sender_mail) {
            $query = $query->whereHas('sender', function($q) use($request) {
                $q->where('id', $request->sender_mail);
            });
        }
        // status
        if($request->status) {
            $query = $query->where('status', $request->status);
        }

        // mail type
        if($request->mail_type) {
            $query = $query->where('mail_type', $request->mail_type);
        }

        $jobCount = $query->count();
        $jobs = $query->latest('id')
                        ->skip(($page - 1) * $perpage)
                        ->take($perpage)
                        ->get();

        $subjectLines = Helper::getSubjectLines();
        return Inertia::render('JobRequest/Index', [
            'jobs' => JobRequestResource::collection($jobs),
            'mails' => $mails,
            'employers' => $employers,
            'resumes' => $resumes,
            'subjectLines' => $subjectLines,
            'totalPages' => ceil(($jobCount / $perpage)),
            'count' => $jobCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {   
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sender_id' => 'required',
            'resume_id' => 'required',
            'receipt_ids' => 'required',
        ]);

        try {
            $jobRequest = DB::transaction(function () use($request) {
                $sender_id = $request->sender_id;
                $receipt_ids = $request->receipt_ids;
                $resume_id = $request->resume_id;
                $subject_line = $request->subject_line;
                $mailType = $request->mailType ? 'modern' : 'trad';
                foreach ($receipt_ids as $receipt_id) {
                    $jobRequest = JobRequest::create([
                        'sender_id' => $sender_id,
                        'receipt_id' => $receipt_id,
                        'resume_id' => $resume_id, 
                        'mail_type' => $mailType ? 1 : 0, // 1 for modern, 0 for traditional
                        'status' => 1, // processing state
                    ]);
                    // send mail
                    $mailData = [
                        'subject_line' => $subject_line,
                        'mail_type' => $mailType,
                    ];
                    $jobSend = $this->sendEmail($sender_id, $receipt_id, $jobRequest, $mailData);

                    if($jobRequest->receiver->name == 'Test Mail' || $jobRequest->receiver->name == 'Test Mail1') {
                        continue;
                    }
                    // update employer status 
                    if($jobSend) {
                        $employee = Employer::find($receipt_id);
                        if($employee) {
                            $employee->update([
                                'status' => 1
                            ]);
                        }
                    } else {
                        Log::error('Not Found');
                        continue;
                    }
                }
                return $jobRequest;
            });
            if($jobRequest) {
                return redirect()->back();
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(JobRequest $jobRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobRequest $jobRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $job = JobRequest::find($id);
        if($job) {
            $job->update([
                'status' => $request->status,
            ]);
            return redirect()->back();
        }

        dd("not found");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobRequest $jobRequest)
    {
        //
    }

    private function sendEmail($sender_id, $receipt_id, $jobRequest, $mailData)
    {
        $mailConfig = CustomMail::find($sender_id);
        $receipient = Employer::find($receipt_id);
        if($mailConfig) {
            $config = [
                'transport' => 'smtp',
                'host' => env('MAIL_HOST'),
                'port' => env('MAIL_PORT'),
                'from' => ['address' => $mailConfig->username, 'name' => 'Min Thet Paing'],
                'encryption' => env('MAIL_ENCRYPTION'),
                'username' => $mailConfig->username,
                'password' => $mailConfig->password,
            ];
            
            // sending mail
            $receipientMails = json_decode($receipient->mail_address);
            $firstEmail = $receipientMails[0]->text;

            if(count($receipientMails) > 1) {
                $otherMails = [];
                for ($i=1; $i < count($receipientMails) ; $i++) { 
                    $otherMails[] = $receipientMails[$i]->text;
                }
                $receipients = [
                    'fristMail' => $firstEmail,
                    'othersMail' => $otherMails,
                ];
                SendMail::dispatch($config, $jobRequest, $receipients, $mailData);
            } else {
                $receipients = [
                    'fristMail' => $firstEmail,
                    'othersMail' => [],
                ];
                SendMail::dispatch($config, $jobRequest, $receipients, $mailData);
            }   
            return true;
        } else {
            return false;
            Log::error("Not found");
        }
    }

    public function saveAsDraft(Request $request)
    {
        $request->validate([
            'sender_id' => 'required',
            'resume_id' => 'required',
            'receipt_ids' => 'required',
        ]);

        foreach ($request->receipt_ids as $receipt_id) {
            JobRequest::create([
                'sender_id' => $request->sender_id,
                'receipt_id' => $receipt_id,
                'resume_id' => $request->resume_id, 
                'mail_type' => $request->mailType ? 1 : 0, // 1 for modern, 0 for traditional
                'status' => 5, // draft state
            ]);
        }

        return redirect()->back();
    }
}
