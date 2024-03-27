<?php

namespace App\Jobs;

use App\Mail\JobRequest;
use App\Models\JobRequest as ModelsJobRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    private ModelsJobRequest $jobRequest;
    private $receipients;
    private $mailData;

    public function __construct(
        private $mailConfig, 
        ModelsJobRequest $jobRequest, 
        $receipients, 
        $mailData
    )
    {
        $this->jobRequest = $jobRequest;
        $this->receipients = $receipients;
        $this->mailData = $mailData;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $mailer = app('custom.mailer', $this->mailConfig);
        $mailer->to($this->receipients['fristMail'])
            ->cc($this->receipients['othersMail'])
            ->send(new JobRequest($this->jobRequest, $this->mailData));
    }
}
