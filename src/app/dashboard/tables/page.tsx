"use client";

import { Loader, Table } from "@mantine/core";
import { useEffect, useState } from "react";

import { fetchTables } from "@/utils/api_client";
import { TablesResponse } from "@/utils/types";

const Tables = () => {
  const [tables, setTables] = useState<TablesResponse | null>(null);
  const [userLimit] = useState(5);
  const [loadingTables, setLoadingTables] = useState(true);

  useEffect(() => {
    const loadTables = async () => {
      setLoadingTables(true);
      try {
        const data = await fetchTables();
        setTables(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTables(false);
      }
    };
    loadTables();
  }, [userLimit]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Tables</h1>
      <div className="shadow-subtle p-4 mb-8 rounded-lg">
        {loadingTables ? (
          <div className="flex justify-center items-center h-32">
            <Loader size="lg" />
          </div>
        ) : (
          <Table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 w-full">
                <th>Table Name</th>
                <th>RLS Enabled</th>
              </tr>
            </thead>
            <tbody>
              {tables
                ? tables.map((table) => (
                    <tr key={table.table_name} className="hover:bg-gray-100/10">
                      <td className="p-2">{table.table_name}</td>
                      <td className="p-2">
                        {table.rls_enabled ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Tables;
