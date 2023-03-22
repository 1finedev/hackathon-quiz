import React, { useMemo, useState } from "react";
import groupData from "../components/sampleGroupData.json";

function Group() {
  const membersData = useMemo(() => groupData.groupMembers, []);

  // Simulating a sorted state
  const [sorted] = useState(true);

  return (
    <div className="w-full h-full xl:flex justify-center p-6 xl:p-0">
      <div className="basis-[55%] flex flex-col items-center justify-center">
        <div className="py-10">
          {!sorted ? (
            <h1 className="text-2xl md:text-3xl text-center">
              Group: Not assigned
            </h1>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl text-center">
                Group 1: Whispering Policemen
              </h1>
              <p className="text-center mt-8 lg:hidden">
                *Scroll to the end to view info concerning the hackathon
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-12 mt-10">
                {membersData.map((member) => (
                  <div
                    key={member.whatsappNumber}
                    className="border border-[#06BA6B] p-4 rounded-lg"
                  >
                    <h1 className="py-2 opacity-100">Name: {member.name}</h1>
                    <h1 className="py-2 opacity-100">
                      Whatsapp number: {member.whatsappNumber}
                    </h1>
                    <h1 className="py-2 opacity-100">
                      Whatsapp @: {member.whatsappTag}
                    </h1>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="basis-[45%] flex items-center justify-center py-10 border-t border-[#06BA6B] xl:border-none">
        <div className="xl:w-4/5 max-w-[650px] space-y-10">
          <h1 className="text-3xl mb-2">Project: Club Music Request🚀</h1>
          <div>
            <h1 className="text-2xl mb-2">Requirements</h1>
            <ol className="list-decimal list-inside">
              <li>Project must be done using ReactJs or NextJs</li>
              <li>Project should be deployed and available live</li>
              <li>You can use additional libs if need be</li>
              <li>App should be responsive on all devices</li>
              <li>App code should be on github</li>
              <li>
                <span className="text-[#06BA6B]">
                  The project is to be submitted in two weeks.
                </span>
              </li>
            </ol>
          </div>

          <div>
            <h1 className="text-2xl mb-2">Tasks</h1>
            <ol className="list-decimal list-inside">
              <li>Users should not need to be authenticated</li>
              <li>Users should be able to create a music request for the Dj</li>
              <li>
                Minimum of 2 pages
                <ol className="list-disc list-inside">
                  <li>
                    Page 1: for users to request for their fav music to be
                    played
                  </li>
                  <li>Page 2: for the Dj to see the requested music</li>
                </ol>
              </li>
            </ol>
          </div>

          <div>
            <h1 className="text-2xl mb-2">Restrictions</h1>
            <ol className="list-decimal list-inside">
              <li>
                Each user can only request for music once every five minutes
              </li>
              <li>
                A user cannot request for a song requested in the last 30
                minutes
              </li>
              <li>
                Reload should&apos;nt be needed for new music requests to be seen
              </li>
              <li>
                The Dj should be able to mark as played or flag as unavailable
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;
