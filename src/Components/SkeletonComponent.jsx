import { Card, Skeleton } from '@heroui/react'
import React from 'react'

export default function SkeletonComponent() {
    return (
        <>
            <Card className="w-full space-y-5 p-4 mt-5 bg-slate-800" radius="lg">
                <div className="max-w-[450px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-5 w-2/5 rounded-lg" />
                        <Skeleton className="h-3 w-1/5 rounded-lg" />
                    </div>
                </div>
                <Skeleton className="rounded-lg">
                    <div className="h-30 rounded-lg bg-default-300" />
                </Skeleton>

                 <div className="max-w-[200px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-5 w-4/5 rounded-lg" />
                    </div>
                </div>
                 <div className="max-w-[250px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-2/5 rounded-lg" />
                        <Skeleton className="h-7 w-5/5 rounded-lg" />
                    </div>
                </div>
            </Card>
        </>
    )
}
