export const getJobRequestStatus =  (status) => {
    switch (status) {
        case 1:
            return 'Processing'
        case 2:
            return 'Reply'
        case 3:
            return 'Interview'
        case 4:
            return 'Reject'
        case 5:
            return 'Draft'
        default:
            return 'Not Processed';
    }
}

export const getAllJobRequestStatus = () =>  {
    const data = [
        {
            id : 1,
            status : 0,
            title : 'Not Processed'
        },
        {
            id : 2,
            status : 1,
            title : 'Processing'
        },
        {
            id : 3,
            status : 2,
            title : 'Reply'
        },
        {
            id : 4,
            status : 3,
            title : 'Interview'
        },
        {
            id : 5,
            status : 4,
            title : 'Reject'
        },
        {
            id : 6,
            status : 5,
            title : 'Draft'
        },
    ]
    return data;
}

export const getJobRequestStatusColor = (status) => {
    switch (status) {
        case 'Processing':
            return 'success'
        case 'Reply':
            return 'warning'
        case 'Interview':
            return 'indigo'
        case 'Reject':
            return 'pink'
        case 'Draft':
            return 'warning'
        default:
            return 'failure';
    }
}