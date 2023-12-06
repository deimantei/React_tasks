import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';


export default function PaletteMetaForm(props) {
    const [open, setOpen] = React.useState(true);
    const [newPaletteName, setNewPaletteName] = React.useState("");
    const [palettes] = React.useState([]);

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
        const isPaletteNameUnique = palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase());
        return isPaletteNameUnique;
    });

    const handlePaletteChange = (evt) => {
        const newName = evt.target.value;
        setNewPaletteName(newName);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => props.handleSubmit(newPaletteName)}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new beautiful palette. Make sure it is unique.
                    </DialogContentText>

                    <TextValidator
                        label='Palette Name'
                        fullWidth
                        margin='normal'
                        value={newPaletteName}
                        name='newPaletteName'
                        onChange={handlePaletteChange}
                        fullWidth
                        margin='normal'
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["Enter Palette Name", "Name already used"]}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        Save Palette
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}