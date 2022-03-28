import { DataGrid } from '@mui/x-data-grid';

export default function Teste() {
  
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid 
      columns={[{ field: 'Tag' }, 
      { field: 'Subfield' }, 
     
      ]}
      rows={[
          {
            id: 1,
            Tag: 'Leader',
            Subfield: "    nam#a22     4a#4500",
          },
          {
            id: 2,
            Tag: "003",
            Subfield: "BR-MnINPA",
          },
        ]}

      />
    </div>
      
    )
        
}