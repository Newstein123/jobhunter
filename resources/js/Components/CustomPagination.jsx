import { router, usePage } from '@inertiajs/react';
import { Pagination } from 'flowbite-react'
import React, { useState } from 'react'

const CustomPagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {url, props} = usePage();
    const totalPages = props.totalPages;
    const onPageChange = (page) => {
        setCurrentPage(page)
        router.get(url, {page : page}, {
            preserveScroll : true,
            preserveState : true,
        })
    }
  return (
    <div className="flex overflow-x-auto sm:justify-center mt-5">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}

export default CustomPagination
