import NextLink from 'next/link'
import { ShopLayout } from "@/components/layouts";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

const columns:GridColDef[] = [
    {field:'id', headerName:'ID', width:100},
    {field:'fullname', headerName:'Nombre Completo', width:300},

    {
        field:'paid',
        headerName:'Pagada',
        description:'Muestra informacion si esta pagada la orden o no',
        width:200,
        renderCell: ( params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined'/>
                    : <Chip color='error' label='No Pagada' variant='outlined'/>
            )
        }
    },
    {
        field:'orden',
        headerName:'Ver orden',
        width:200,
        sortable:false,
        renderCell: ( params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}` } passHref legacyBehavior>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }

        
    }
    
];

const rows =[
    { id: 1, paid:true, fullname: 'Luis Mariano'},
    { id: 2, paid:false, fullname: 'Melissa Flores'},
    { id: 3, paid:true, fullname: 'Hernando Vallejo'},
    { id: 4, paid:false, fullname: 'Emin Reyes'},
    { id: 5, paid:true, fullname: 'Eduardo Rios'},
    { id: 6, paid:false, fullname: 'Natalia Herrera'},
   
]

const HistoryPage = () => {
  return (
    <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de ordenes del cliente"}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12} sx={{height:550, width:'100%'}}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage;
