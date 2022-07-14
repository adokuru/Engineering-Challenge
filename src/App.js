import React from "react";
import { useQuery, gql } from "@apollo/client";
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from "./Table";
import moment from "moment";
const GET_DATA = gql`
  query Query {
    characters {
      results {
        name
        image
        id
        gender
        status
        location {
          name
        }
        created
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_DATA);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "image",
        emailAccessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Location",
        accessor: "location.name",
        enableGrouping: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Created Date",
        accessor: "created",
        filter: "includes",
      },
    ],
    []
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const dataToDisplay = data.characters.results.map((character) => ({
    ...character,
    created: moment(character.created).format("MM/DD/YYYY"),
  }));

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900'>
      <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
        <div className=''>
          <h1 className='text-xl font-semibold'>Engineering Challenge</h1>
        </div>
        <div className='mt-6'>
          <Table columns={columns} data={dataToDisplay} />
        </div>
      </main>
    </div>
  );
}

export default App;
