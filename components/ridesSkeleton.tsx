import React from "react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const RidesSkeleton:React.FC<any>=()=>{
    return(
        <Card  className="w-full min-w-[300px]">
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 sm:h-16 sm:w-16 rounded-full" />
                <div className="flex flex-col justify-center">
                  <Skeleton className="h-4 w-24 sm:w-32 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-4 w-10 sm:w-16" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <div className="flex flex-col">
                <Skeleton className="h-4 w-28 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    )
}