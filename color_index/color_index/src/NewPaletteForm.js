import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {styled, useTheme} from '@mui/material/styles';
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
import DraggableColorBoxWrapper from './DraggableColorBoxWrapper';
import DraggableColorBox from './DraggableColorBox';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {arrayMove} from '@dnd-kit/sortable';
import seedColors from "./seedColors";
import './NewPaletteForm.css'
import PaletteMetaForm from './PaletteMetaForm';


const drawerWidth = 400;


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,

        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

class NewPaletteForm extends Component {

    render() {

        return (
            <PersistentDrawerLeft savePalette={this.props.savePalette} palettes={this.props.palettes}/>
        );
    }
}


function PersistentDrawerLeft(props) {
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState("pink");
    const [colors, setColors] = React.useState([]);
    //const [setNewPaletteName] = React.useState("");
    const [formShowing, setFormShowing] = React.useState(false);
    const [newName, setNewName] = React.useState("");
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
            const newColor = {color: currentColor, name: newName};
            setColors([...colors, newColor]);
            setNewName('');
        }
    }

    const handleChange = (evt) => {
        const newName = evt.target.value;
        setNewName(newName);
    };

    const showForm = () => {
        setFormShowing(true);
    };

    const removeColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName));
    };

    const onDragEnd = (evt) => {
        const {active, over} = evt;
        if (active.id === over.id) {
            return;
        }
        setColors((prevColors) => {
            const oldIndex = prevColors.findIndex((color) => color.name === active.id);
            const newIndex = prevColors.findIndex((color) => color.name === over.id);
            return arrayMove(prevColors, oldIndex, newIndex);
        });
    };
    const clearColors = () => {
        setColors([]);
    };

    const addRandomColor = (palettes) => {
        const allColors = palettes.map((p) => p.colors).flat();
        const rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];

        if (randomColor && randomColor.name) {
            // Make sure 'name' is present in 'randomColor'
            setColors([...colors, randomColor]);
        } else {
            console.log('failed')
            console.log({randomColor});
            console.log({rand});
            console.log('length of all colors', allColors.length);
        }
    };


    const handleSubmit = (newPaletteName) => {
        const newPalette = {
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: colors,
        };
        console.log({newPaletteName});
        console.log('id:', newPalette.id);
        // Call the savePalette function from props
        props.savePalette(newPalette);
        // Redirect to the desired route
        history.push('/');
    };

// Define your custom validation rules here
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
        const isNameUnique = colors.every(({name}) => name.toLowerCase() !== value.toLowerCase());
        return isNameUnique;
    });

    ValidatorForm.addValidationRule('isColorUnique', () => {
        const isColorUnique = colors.every(({color}) => color !== currentColor);
        return isColorUnique;
    });


    return (
        <Box className='root' sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open} color='default'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create A Palette
                    </Typography>

                </Toolbar>
                <div className='navbuttons'>

                    <Link to='/'>
                        <Button
                            variant='contained'
                            color='secondary'>
                            Go back
                        </Button>
                    </Link>
                    <Button variant="contained" onClick={showForm}>
                        Create A Palette
                    </Button>
                </div>
            </AppBar>
            {formShowing && <PaletteMetaForm palettes={props.palettes} handleSubmit={handleSubmit}/>}
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <div className='container'>
                    <Typography variant='h4' gutterBottom>Design your palette</Typography>

                    <div className='buttons'>
                        <Button variant='contained'
                                className='button'
                                color='secondary'
                                onClick={clearColors}>
                            Clear Palette
                        </Button>
                        <Button
                            className='button'
                            variant='contained'
                            color='primary'
                            onClick={() => addRandomColor(props.palettes)}>
                            Random Color
                        </Button>
                    </div>

                    <ChromePicker
                        className='picker'
                        color={currentColor}
                        onChangeComplete={updateCurrentColor}
                    />
                    <Divider/>
                    <ValidatorForm onSubmit={addNewColor}>
                        <TextValidator
                            type='TEXT'
                            className='colorNameInput'
                            variant='filled'
                            margin='normal'
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
                            className='addColor'
                            color='primary'
                            type='submit'
                            style={{background: currentColor}}
                        >Add Color</Button>
                    </ValidatorForm>
                </div>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                <div>
                    <DraggableColorBoxWrapper colors={colors} removeColor={removeColor} onDragEnd={onDragEnd}/>
                </div>
            </Main>
        </Box>
    );
}

export default NewPaletteForm;
