<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Resources\EmployeeResource;
use App\Models\Employer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $perpage = $request->perpage ?? 10;
        $job_portals = Helper::getJobPortals();
        $countries = Helper::getCountries();
        $positions = Helper::getPositions();
        $employers = Employer::latest('id')->skip(($page - 1) * $perpage)->take($perpage)->get();
        return Inertia::render('Employer/Index', [
            'employers' => EmployeeResource::collection($employers),
            'job_portals' => $job_portals,
            'countries' => $countries,
            'positions' => $positions,
            'totalPages' => ceil((Employer::count() / $perpage))
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $employer = Employer::create([
            'name' => $request->name,
            'mail_address' => json_encode($request->mail_address),
            'reputation' => $request->reputation ?? '',
            'job_portal' => $request->job_portal,
            'country' => $request->country,
            'position' => $request->position,
        ]);
        return redirect()->back();
    }

    public function bulkUpload(Request $request)
    {
        $request->validate([
            'file' => 'required'
        ]);

        if($request->hasFile('file')) {
            $path = $request->file('file')->getRealPath();
            $csvData = array_map('str_getcsv', file($path));
            unset($csvData[0]);
            foreach ($csvData as $row) {

                if(!array_key_exists(0, $row) || !array_key_exists(3, $row) || !array_key_exists(4, $row)) {
                    continue;
                }

                if($row[0] == '' || $row[3] == '' || $row[4] == '') {
                    continue;
                }

                $mailAddress = explode(',', $row[0]);
                $formattedAddress = [];
                if(count($mailAddress) > 0) {
                    foreach ($mailAddress as $key => $address) {
                        $formattedAddress[$key]['id'] = $address;
                        $formattedAddress[$key]['text'] = $address;
                    }
                }
            
                Employer::create([
                    'name' => $row[3],
                    'mail_address' => json_encode($formattedAddress),
                    'reputation' => '',
                    'job_portal' => $row[4],
                    'country' => 'Singapore',
                    'position' => $row[1] == '' ? 'Web Developer' : $row[1],
                ]);
            }
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employer $employer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $employer = Employer::find($id);
        $job_portals = Helper::getJobPortals();
        $countries = Helper::getCountries();
        $positions = Helper::getPositions();

        if($employer) {
            return Inertia::render('Employer/Edit', [
                'employer' => $employer,
                'job_portals' => $job_portals,
                'countries' => $countries,
                'positions' => $positions,
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
        ]);

        $employer = Employer::find($id);

        if($employer) {
            try {
                $employer->update([
                    'name' => $request->name,
                    'mail_address' => $request->mail_address,
                    'reputation' => $request->reputation,
                    'job_portal' => $request->job_portal,
                    'country' => $request->country,
                    'position' => $request->position,
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
        $employer = Employer::find($id);

        if($employer) {
            $employer->delete();
            return redirect()->back();
        }
        dd("not found");
    }

    public function changeStatus(Request $request, $id)
    {
        $employer = Employer::find($id);
        if($employer) {
            $employer->update([
                'status' => $request->status,
            ]); 
            return redirect()->back();
        }

        dd("Not found");
    }
}
