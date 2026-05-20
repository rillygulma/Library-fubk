"use client";

type DatabaseEntry = {
  id: number;
  database: string;
  disciplines: string;
  description: string;
  access: string;
  url: string;
};

const AccessDatabasesPage = () => {
  const databaseInfo: DatabaseEntry[] = [
    {
      id: 1,
      database: "AGRIS: Agricultural database",
      disciplines: "Agriculture",
      description:
        "Covers agriculture, forestry, animal husbandry, aquatic sciences and fisheries, human nutrition, extension literature from over 100 participating countries. Material includes unique grey literature such as unpublished scientific and technical reports, theses, conference papers, government publications, and more",
      access: "Open Access",
      url: "https://agris.fao.org/",
    },
    {
      id: 2,
      database: "Analytical sciences digital library",
      disciplines: "Analytical Chemistry",
      description: "Journal Articles on analytical chemistry",
      access: "Open source",
      url: "https://www.asdlib.org/",
    },
    {
      id: 3,
      database: "Arachne",
      disciplines: "Archaeology, Art History",
      description: "Journal Articles on Archaeology, Art History",
      access: "Open Access",
      url: "https://arachne.uni-koeln.de/",
    },
    {
      id: 4,
      database: "arXiv",
      disciplines:
        "Mathematics, Physics, Astronomy, Computer Science, Quantitative Biology, Statistics, Quantitative Finance",
      description:
        "Repository of electronic pre-prints of papers in various fields",
      access: "Open Access",
      url: "https://arxiv.org/",
    },
    {
      id: 5,
      database: "Astrophysics Data System",
      disciplines: "Astrophysics, Geophysics, Physics",
      description: "Journal articles on astrophysics, geophysics, and physics",
      access: "Open Access",
      url: "https://ui.adsabs.harvard.edu/",
    },
  ];

  return (
    <div className="mt-20 rounded-lg px-4 py-8 shadow-lg sm:px-6 lg:px-24">
      <h2 className="text-center text-xl font-bold text-gray-800 sm:text-2xl">
        Services | Open Access Databases
      </h2>

      <hr className="my-4 border-gray-400" />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left text-sm shadow-md sm:text-base">
          <thead>
            <tr className="text-gray-700">
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                S/N
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Database
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Disciplines
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Description / Specialization
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">
                Access
              </th>
            </tr>
          </thead>

          <tbody>
            {databaseInfo.map((entry, index) => (
              <tr
                key={entry.id}
                className={index % 2 === 0 ? "" : ""}
              >
                <td className="border-t border-gray-300 px-4 py-2">
                  {entry.id}
                </td>

                <td className="border-t border-gray-300 px-4 py-2 text-blue-600">
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {entry.database}
                  </a>
                </td>

                <td className="border-t border-gray-300 px-4 py-2">
                  {entry.disciplines}
                </td>

                <td className="border-t border-gray-300 px-4 py-2">
                  {entry.description}
                </td>

                <td className="border-t border-gray-300 px-4 py-2">
                  {entry.access}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessDatabasesPage;