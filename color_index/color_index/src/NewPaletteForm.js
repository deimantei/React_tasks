import React, { Component } from 'react';
import {useHistory} from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {ChromePicker} from 'react-color';
import DraggableColorBox from './DraggableColorBox';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


const drawerWidth = 400;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
       flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
 

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

class NewPaletteForm extends Component {

  render() {

    return (
      <PersistentDrawerLeft savePalette={this.props.savePalette}/>
    );
  }
}

function PersistentDrawerLeft(props) {
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState("pink");
  const [colors, setColors] = React.useState([]);
  const [palettes] = React.useState([]);
  const [newName, setNewName] = React.useState("");
  const [newPaletteName, setNewPaletteName] = React.useState("");
  const [required] = React.useState(true);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    console.log(newColor.hex);
    setCurrentColor(newColor.hex); 
  }

  const addNewColor = () => {
    if (required) {
      const newColor = { color: currentColor, name: newName };
      setColors([...colors, newColor]);
      setNewName(''); // Clear the input field after adding
    }
  }

  const handleChange = (evt) => {
    const newName = evt.target.value;
    setNewName(newName);
  };

  const handlePaletteChange = (evt) => {
    const newName = evt.target.value;
    setNewPaletteName(newName);
  };

  const handleSubmit = () => {
    // Create a new palette object
    const newPalette = {
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
  
    // Call the savePalette function from props
    props.savePalette(newPalette);
  
    // Redirect to the desired route
    history.push('/');
  };
  
// Define your custom validation rules here
ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
  const isNameUnique = colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
  return isNameUnique;
});

ValidatorForm.addValidationRule('isColorUnique', () => {
  const isColorUnique = colors.every(({ color }) => color !== currentColor);
  return isColorUnique;
});

ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
  const isPaletteNameUnique = palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
  return isPaletteNameUnique;
});

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='default'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Create A Palette
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
                label='Palette Name'
                value={newPaletteName}
                name='newPaletteName'
                onChange={handlePaletteChange}
                fullWidth
                margin='normal'
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />
          <Button 
          variant='contained' 
          color='primary'
          type='submit' 
          >
            Save Palette
          </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h4'>Design your palette</Typography>
        <div>
        <Button variant='contained' color='secondary'>Clear Palette</Button>
        <Button variant='contained' color='primary'>Random Color</Button>
        </div>
        <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm onSubmit={addNewColor}>
        <TextValidator
         type='TEXT'
         value={newName} 
         onChange={handleChange}
         validators={required ? ['required', 'isColorNameUnique', 'isColorUnique'] : []}
            errorMessages={[
              'This field is required',
              'Color name must be unique',
              'Color must be unique',
            ]}
            label="Enter color name"
            helperText={!required && 'Color name must be unique'}
         />
        <Button 
        variant='contained' 
        color='primary' 
        type='submit'
        style={{background: currentColor}}
       >Add Color</Button>
        </ValidatorForm>
        <Divider />
        </Drawer>
        <Main open={open}>
        <DrawerHeader />
        <div>
        {colors.map(color => (
            <DraggableColorBox color={color.color} name={color.name}/>
         ))}
        </div>
      </Main>
    </Box>
  );
}

export default NewPaletteForm;
