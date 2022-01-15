import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { Item } from "../services/itemService";

interface BarcodeCardProps {
  item: Item;
}
const BarcodeCard: React.FC<BarcodeCardProps> = ({
  item,
}) => {

  const eanCode = item.ean.toString().padStart(13);
  const barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${eanCode}&code=EAN13`;

  const handlePrint = () => {
    const printWindow = window.open("about:blank", "_new");
    
    if (!printWindow) {
      return;
    }
    
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <body>
          <img
            src="${barcodeUrl}"
            style="width: 904px; height: 400px;" />
        </body>
      </html>
    `);

    setTimeout(() => {
      printWindow.print();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader
        title="Code barre (EAN-13)"
      />
      <Divider />
      <CardContent>
        <Grid
          direction="column"
          alignItems="center"
          justifyContent="center"
          container
        >
          <Grid item>
            <img
              src={barcodeUrl}
              alt={item.name}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          startIcon={<DownloadIcon />}
          component="a"
          href={`${barcodeUrl}&download=true`}
          fullWidth
        >
          Télécharger
        </Button>
        <Button
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          fullWidth
          color="secondary"
        >
          Imprimer
        </Button>
      </CardActions>
    </Card>
  );
};

export default BarcodeCard;
