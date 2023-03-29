import connectToDb from "../backend/connectToDb";
import Group from "../backend/models/groupModel";
import User from "../backend/models/userModel";

export async function getStaticProps() {
  await connectToDb();

  const result = await Group.find({}).populate({
    path: "members",
    select: "whatsappName mobile",
    model: User,
  });

  return {
    props: { data: JSON.parse(JSON.stringify(result)) }, // nextjs serialization issue
    revalidate: 10, // Regenerate list every minute
  };
}

const Groups = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <h1 className="mb-6 text-3xl font-bold">Hackathon Group List</h1>

      {data.map((group) => {
        return (
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
              <h4 className="text-[#C9C9C9] text-xl font-bold">{group.name}</h4>
            </div>

            <div className="mt-4">
              <div className="flex flex-col space-y-2">
                {group.members.map((member, index) => {
                  return (
                    <li
                      key={member.whatsappName}
                      className="text-[#C9C9C9] text-lg font-bold"
                    >
                      {index + 1}. @{member.whatsappName.replace("@", "")}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
