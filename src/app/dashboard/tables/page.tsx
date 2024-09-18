"use client";

import { Loader, Table } from "@mantine/core";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { fetchTables, toggleTableRls } from "@/utils/api_client";
import { TablesResponse } from "@/utils/types";

const Tables = () => {
  const [tables, setTables] = useState<TablesResponse | null>(null);
  const [userLimit] = useState(5);
  const [loadingTables, setLoadingTables] = useState(true);
  const [isToggling, setIsToggling] = useState<string | null>(null);

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

  const handleToggleClick = async (tableName: string, enable: boolean) => {
    setIsToggling(tableName);
    await toggleTableRls(tableName, enable);
    setIsToggling(null);
  };

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
                <th>Toggle RLS</th>
              </tr>
            </thead>
            <tbody>
              {tables
                ? tables.map((table) => {
                    const isTogglingThisRow = isToggling === table.table_name;

                    return (
                      <tr
                        key={table.table_name}
                        className="hover:bg-gray-100/10"
                      >
                        <td className="p-2">{table.table_name}</td>
                        <td className="p-2">
                          {table.rls_enabled ? (
                            <span className="text-green-500">Yes</span>
                          ) : (
                            <span className="text-red-500">No</span>
                          )}
                        </td>
                        <td>
                          <button
                            className={clsx(
                              "bg-white text-primary rounded-md w-48 justify-center px-4 py-2 hover:bg-primary hover:text-white my-2 flex items-center gap-2",
                              isTogglingThisRow &&
                                "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isTogglingThisRow}
                            onClick={() =>
                              handleToggleClick(
                                table.table_name,
                                !table.rls_enabled
                              )
                            }
                          >
                            {isTogglingThisRow && (
                              <div className="block animate-spin rounded-full border-2 h-5 w-5 border-t-white border-primary/50" />
                            )}
                            Toggle
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Tables;
