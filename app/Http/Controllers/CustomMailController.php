<?php

namespace App\Http\Controllers;

use App\Models\CustomMail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomMailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mails = CustomMail::all();
        return Inertia::render('Mail/Index', [
            'mails' => $mails
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
            'mail_address' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        try {
            $mail = CustomMail::create([
                'mail_address' => $request->mail_address,
                'username' => $request->username,
                'password' => $request->password,
            ]); 
            return redirect()->back();
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomMail $customMail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $mail = CustomMail::find($id);
        if($mail) {
            return Inertia::render('Mail/Edit', [
                'mail' => $mail
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
            'mail_address' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        $mail = CustomMail::find($id);

        if($mail) {
            try {
                $mail->update([
                    'mail_address' => $request->mail_address,
                    'username' => $request->username,
                    'password' => $request->password,
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
        $mail = CustomMail::find($id);

        if($mail) {
            $mail->delete();
            return redirect()->back();
        }

        dd("not found");
    }
}
