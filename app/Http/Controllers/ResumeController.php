<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResumeResource;
use App\Models\CustomMail;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mails = CustomMail::select('id', 'mail_address')->latest('id')->get();
        $resumes = Resume::with('email')->get();
        return Inertia::render('Resume/Index', [
            'resumes' => $resumes,
            'mails' => $mails,
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
            'name' => 'required',
            'custom_mail_id' => 'required',
            'resume' => 'required',
        ]);

        $path = '';
        if($request->hasFile('resume')) {
            $file = $request->file('resume');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = Storage::putFileAs('resume', $file, $filename);
        }

        Resume::create([
            'name' => $request->name,
            'custom_mail_id' => $request->custom_mail_id,
            'resume' => $path
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $resume = Resume::find($id);
        $mails = CustomMail::select('id', 'mail_address')->latest('id')->get();
        if($resume) {
            return Inertia::render('Resume/Edit', [
                'resume' => new ResumeResource($resume),
                'mails' => $mails
            ]);
        }
        dd("not found");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'custom_mail_id' => 'required',
            'resume' => 'required',
        ]);

        $resume = Resume::find($id);
        
        if($resume) {
            $path = '';
            try {
                if($request->hasFile('resume')) {
                    // delete file 
                    Storage::delete($resume->resume);
                    // upload file 
                    $file = $request->file('resume');
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $path = Storage::putFileAs('resume', $file, $filename);
                }
    
                $resume->update([
                    'name' => $request->name,
                    'custom_mail_id' => $request->custom_mail_id,
                    'resume' => $path,
                ]);
                return redirect()->back();
            } catch (\Exception $e) {
                dd($e->getMessage());
            }
        }

        dd("not found");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $resume = Resume::find($id);
        if($resume) {
            $resume->delete();
            return redirect()->back();
        }

        dd("not found");
    }
}
