import { useState, useEffect } from "react";

import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from "@tanstack/react-table";
import axios from "../../../api/axios";
import InsertPaciente from "./components/InsertPaciente";

type Paciente = {
    id: string,
    nombre: string,
    dueño: string,
    tipoRaza: number
};

export default () => {
    const [data, setData] = useState<Paciente[]>([]);

    useEffect(() => {
        const populate = async () => {
            const response = await axios.get("/PacienteVeterinario");
            setData(response.data);
        }
        populate();
    }, []);
    
    const helper = createColumnHelper<Paciente>();

    const columns = [
        helper.accessor(
            "id", { cell: info => info.getValue().slice(-6) }),
        helper.accessor("nombre", 
            { cell: info => info.getValue() }
        ),
        helper.accessor("dueño", { cell: info => info.getValue().slice(-6) }),
        helper.accessor("tipoRaza", { cell: info => info.getValue() }),
    ];

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div>
            { data &&
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map(h => (
                            <tr key={h.id}>
                                {h.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>}
            <InsertPaciente />
        </div>
    );
};
