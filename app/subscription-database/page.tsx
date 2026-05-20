"use client";

type DatabaseInfo = {
  link: string;
  title: string;
  userId: string;
  password: string;
};

const SubscriptionDatabasesPage = () => {
  const databaseInfo: DatabaseInfo[] = [
    {
      link: "https://ajls.ng/",
      title: "Click To AJLS.NG",
      userId: "fubk-library@tetfund.gov.ng",
      password: "Password@1",
    },
    {
      link: "https://search.ebscohost.com/",
      title: "Click To Ebscohost.com",
      userId: "fubk",
      password: "@ccess2023",
    },
    {
      link: "https://research4life.org/",
      title: "Click To Research4life.org",
      userId: "NGAR4L222",
      password: "Ppear38",
    },
  ];

  return (
    <div className="rounded-lg px-4 py-8 shadow-lg sm:px-6 lg:px-24">
      <h2 className="text-center text-xl font-bold text-gray-800 sm:text-2xl">
        Services | Subscription Databases
      </h2>

      <hr className="my-4 border-gray-400" />

      <div className="w-full overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-300 text-left text-sm shadow-md sm:text-base">
          <thead>
            <tr className="text-gray-700">
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                S/N
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Link
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                User ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Password
              </th>
            </tr>
          </thead>

          <tbody>
            {databaseInfo.map((entry, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "" : ""}
              >
                <td className="border-t border-gray-300 px-4 py-2">
                  {index + 1}
                </td>

                <td className="border-t border-gray-300 px-4 py-2 text-blue-600">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all hover:underline"
                  >
                    {entry.link}
                  </a>
                </td>

                <td className="border-t border-gray-300 px-4 py-2">
                  {entry.title}
                </td>

                <td className="break-words border-t border-gray-300 px-4 py-2">
                  {entry.userId}
                </td>

                <td className="break-words border-t border-gray-300 px-4 py-2">
                  {entry.password}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionDatabasesPage;