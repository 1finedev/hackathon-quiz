import { useSession } from "next-auth/react";
import Link from "next/link";
import connectToDb from "../backend/connectToDb";
import Group from "../backend/models/groupModel";
import getSession from "../backend/getSession";
import User from "../backend/models/userModel";

export async function getServerSideProps({ req, res }) {
  await connectToDb();
  const session = await getSession(req, res);
  if (!session)
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };

  const group = await Group.find({
    members: { $in: [session.user._id] },
  }).populate({
    path: "members",
    select: "whatsappName mobile",
    model: User,
  });

  return {
    props: {
      group: JSON.parse(JSON.stringify(group.length > 0 ? group[0] : [])),
    }, // nextjs serialization issue
  };
}

function Profile({ group }) {
  const { data: session } = useSession();

  return (
    <div className="w-full max-w-[1920px] h-full xl:flex justify-center p-6 xl:p-0">
      {group.length < 1 ? (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
          <h1 className="text-2xl text-center md:text-3xl">
            Group not found 😔
          </h1>
          <h1 className="text-2xl text-center md:text-3xl">
            Contact the admin if you think this is an error!
          </h1>
        </div>
      ) : (
        <>
          <div className="basis-[55%] flex flex-col items-center justify-center">
            <div className="py-10">
              <h1 className="text-2xl text-center md:text-3xl">
                Welcome back {session.user.whatsappName}!
              </h1>
            </div>

            <div
              key={group.name}
              className="w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <svg
                  className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
                <h4 className="text-[#C9C9C9] text-xl font-bold">
                  {group.name}
                </h4>
              </div>

              <div className="mt-4">
                <div className="flex flex-col space-y-2">
                  {group.members.map((member, index) => {
                    return (
                      <li
                        key={member.whatsappName}
                        className="text-[#C9C9C9] text-lg font-bold"
                      >
                        <Link
                          href={`https://wa.me/${member.mobile
                            .replace("+", "")
                            .replaceAll(
                              " ",
                              ""
                            )}?text=Hello%20you%20are%20a%20member%20in%20my%20hackathon%20group%20${
                            group.name
                          }%20how%20do%20we%20begin?`}
                        >
                          {" "}
                          @{member.whatsappName.replace("@", "")}
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[45%] flex items-center justify-center py-10 border-t border-[#06BA6B] xl:border-none">
            <div className="xl:w-4/5 max-w-[650px] space-y-10">
              <h1 className="mb-2 text-3xl text-center">{group.project}</h1>
              <h3>{group.description}</h3>
              <div>
                <h1 className="mb-2 text-2xl text-[#06BA6B]">Requirements</h1>
                <ol className="list-decimal list-inside">
                  {group.requirements.map((requirement, index) => (
                    <li key={index} className="mb-1">
                      {requirement}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h1 className="mb-2 text-2xl">Tasks</h1>
                <ol className="list-decimal list-inside">
                  {group.tasks.map((task, index) => (
                    <li key={index} className="mb-2">
                      {task}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h1 className="mb-2 text-2xl">Restrictions</h1>
                <ol className="list-decimal list-inside">
                  {group.restrictions.map((restriction, index) => (
                    <li key={index} className="mb-2">
                      {restriction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

Profile.auth = true;
