<?php

namespace App\Extensions;

use Illuminate\Mail\MailManager;

class CustomMailManager extends MailManager
{
    public function __construct($app, private readonly array $customConfig)
    {
        parent::__construct($app);
    }

    protected function getConfig(string $name)
    {
        return $this->customConfig;
    }
}
