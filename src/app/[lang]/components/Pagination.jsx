"use client"
import React from 'react'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from 'next/navigation';


function Pagination({ data }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    let active = searchParams.get("page") ? +searchParams.get("page") : 1
    const params = new URLSearchParams()

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        onClick: () => {
            params.set("page", index);
            router.push(`?${params.toString()}`)
        }
    });

    const next = () => {
        if (active === 5) return;
        params.set("page", active + 1);
        router.push(`?${params.toString()}`)
    };

    const prev = () => {
        if (active === 1) return;
        params.set("page", active - 1);
        router.push(`?${params.toString()}`)
    };

    return (
        <div className="flex items-center gap-4 justify-center my-10">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({ length: data?.meta?.total_pages }).map((item, index) => (
                    <IconButton className={`${active === index + 1 && "bg-custom-blue"}`} key={index + 1} {...getItemProps(index + 1)}>{index + 1}</IconButton>
                ))}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === data?.meta?.total_pages}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default React.memo(Pagination) 
