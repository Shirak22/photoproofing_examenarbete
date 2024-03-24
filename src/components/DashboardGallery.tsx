'use client'
import { Switch } from "@headlessui/react";
import { useState } from "react";
import ImageCardDashboard from "./ImageCardDashboard";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }




export default function DashboardGallery(params: {thumbs: any, albumId: string}) {
    const [enabled, setEnabled] = useState(false);
    const thumbs = params.thumbs;
    return (
        <div>
            {/* //if you want to style you can add styling prop to H1 */}
            <div className="flex items-center justify-end ">
              <p className="text-xs mr-2">Filter selected:</p>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? "bg-slate-500" : "bg-neutral-300",
                  "my-auto relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus:ring-neutral-600 "
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-3" : "translate-x-0",
                    "my-auto pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          
          <section className="flex gap-4 justify-start flex-wrap h-full">
            {thumbs && enabled ? thumbs.filter((image: any) => image.selected).map((image: any) => (
                <ImageCardDashboard key={image.imageId} image={image} albumId={params.albumId} />
                )) : thumbs.map((image: any) => (
                <ImageCardDashboard key={image.imageId} image={image} albumId={params.albumId} />
                ))}

          </section>
        </div>
      );


}