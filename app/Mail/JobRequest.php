<?php

namespace App\Mail;

use App\Helpers\Helper;
use App\Models\JobRequest as ModelsJobRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class JobRequest extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    private $mailData;

    public function __construct(protected ModelsJobRequest $jobrequest, $mailData)
    {
        $this->mailData = $mailData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
                subject: Helper::getSubjectLine($this->mailData['subject_line'], $this->jobrequest->receiver->position, $this->jobrequest->receiver->name),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            html : $this->mailData['mail_type'] == 'trad' ? 'mails.traditional' : 'mails.modern',
            with: [
                'position' => $this->jobrequest->receiver->position,
                'job_portal' => $this->jobrequest->receiver->job_portal,
                'company_name' => $this->jobrequest->receiver->name,
                'reputation' => $this->jobrequest->receiver->reputation,
                'mail_address' => $this->jobrequest->sender->mail_address,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromStorage($this->jobrequest->resume->resume)
                ->as('MinThetPaing_Resume.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
