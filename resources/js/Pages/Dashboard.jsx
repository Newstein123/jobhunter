import CustomLayout from '@/Layouts/CustomLayout';
import { Badge } from 'flowbite-react';

export default function Dashboard({
    employerCount, 
    jobCount, 
    mailCount, 
    resumeCount,
    jobProcessed,
    jobInterviewed,
    jobReplied,
    jobRejected,
    todayJobCount,
    jobError
}) {
    return (
        <div> 
            {/* dashboard data  */}
            <div className="flex justify-between gap-2">
                <div className='p-3 border-2 shadow-md shadow-slate-500'>
                    <h1 className='text-xl font-bold'> Employer Number </h1>
                    <p className='text-4xl text-purple-700 text-center my-3'>{employerCount} </p>
                </div>
                <div className='p-3 border-2 shadow-md shadow-slate-500'>
                    <h1 className='text-xl font-bold'> Total Job Request Number </h1>
                    <p className='text-4xl text-purple-700 text-center my-3'>{jobCount} </p>
                    <div className='text-end'>
                        <div className="inline">  
                            <Badge 
                                color="success"
                            >
                                Today
                            </Badge>
                        </div>
                        <p className='text-xl font-bold'> {todayJobCount} </p>
                    </div>
                </div>
                <div className='p-3 border-2 shadow-md shadow-slate-500'>
                    <h1 className='text-xl font-bold'> Resume Number </h1>
                    <p className='text-4xl text-purple-700 text-center my-3'>{resumeCount} </p>
                </div>
                <div className='p-3 border-2 shadow-md shadow-slate-500'>
                    <h1 className='text-xl font-bold'> Mail Number </h1>
                    <p className='text-4xl text-purple-700 text-center my-3'>{mailCount} </p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/2">
                    {/* job request  */}
                    <h1 className='text-2xl mt-10'> Job Request </h1>
                    <hr />
                    <div className='flex justify-between items-center my-3'>
                        <p className='text-slate-700 text-lg'> Processing </p>
                        <p> {jobProcessed} </p>
                    </div>
                    <div className='flex justify-between items-center my-3'>
                        <p className='text-slate-700 text-lg'> Interviewing </p>
                        <p> {jobInterviewed} </p>
                    </div>
                    <div className='flex justify-between items-center my-3'>
                        <p className='text-slate-700 text-lg'> Replied </p>
                        <p> {jobReplied} </p>
                    </div>
                    <div className='flex justify-between items-center my-3'>
                        <p className='text-slate-700 text-lg'> Rejected </p>
                        <p> {jobRejected} </p>
                    </div>
                    <div className='flex justify-between items-center my-3'>
                        <p className='text-slate-700 text-lg'> Email Error </p>
                        <p> {jobError} </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

Dashboard.layout = (page) => <CustomLayout children={page} />
