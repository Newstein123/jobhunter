<?php

namespace App\Helpers;

class Helper {

    public static function getPositions()
    {
        $positions = [
            'Senior PHP Developer',
            'Senior Laravel Developer',
            'Laravel (PHP) Developer',
            'Frontend Developer',
            'Application Developer',
            'Full Stack Developer',
            'Web Developer'
        ];
        return $positions;
    }

    public static function getJobPortals()
    {
        $job_portals = [
            'JobDB',
            'JobStreet',
            'GlassDoor',
            'Indeed',
            'LinkedIn',
            'FastJob',
            'JobCentral',
            'BCA',
            'GrabJob',
            'Monster',
            'JobCentral',
            'Database'
        ];
        return $job_portals;
    }

    public static function getCountries()
    {
        $countries = [
            'Thai',
            'Singapore',
            'Honkong',
            'Dubai'
        ];
        return $countries;
    }

    public static function getSubjectLines()
    {
        $subject_lines = [
            'traditional' => [
                'Job Posting: $role',
                'Resume attached for $role',
                'Request to accept my resume for $role',
                'May I get an opportunity of $role',
                'Position for $role',
                'Please accept my resume for $role'
            ],
            'modern' => [
                'Let\'s Work Together: $role Available for $company',
                'Offering Support: Min Thet Paing Seeking Opportunities at $company',
                'Seeking Opportunities: $role Aligned with $company Goals'
            ]
        ];
        return $subject_lines;
    }

    public static function getSubjectLine($string, $role, $company = '')
    {   
        $replacements = [
            '$role' => $role,
            '$company' => $company,
        ];
    
        return strtr($string, $replacements);
    }
}