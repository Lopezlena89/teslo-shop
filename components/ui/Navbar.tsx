import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import {  useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '@/context';


export const Navbar = () => {
    
    const {asPath,push} = useRouter();
    const {toggleSideMenu} = useContext(UiContext)
    
    const [searchTerm, setSearchTerm] = useState('');
    const [isSeachVisible, setIsSeachVisible] = useState(false);

    const onSearchTerm = (e:any) =>{
        e.preventDefault();
        if(searchTerm.trim().length === 0)return;
       
        push(`/search/${searchTerm}`);
    }

    
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Testo |</Typography>
                    <Typography sx={{marginLeft:0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>
        
            <Box sx={{ display: isSeachVisible ? 'none' : {xs:'none', sm:'block'}}} className='fadeIn'>
                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button color={asPath === '/category/women' ? 'primary' : 'info'} >Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1}/>
            
            {/* Pantallas grandes */}
            {
                isSeachVisible
                    ? (
                        <form onSubmit={onSearchTerm}>
                            <Input
                                sx={{ display:{xs:'none', sm:'flex'}}}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) =>setSearchTerm(e.target.value)}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSeachVisible(false)}
                                        >
                                            <ClearOutlined/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </form>
                    )
                    :   <IconButton
                            onClick={ () => setIsSeachVisible(true)}
                            className='fadeIn'
                            sx={{display:{xs:'none', sm:'flex'}}}
                        >
                            <SearchOutlined/>
                        </IconButton>
            }
            

            <IconButton
                sx={{display:{xs:'flex', sm:'none'}}}
                onClick={toggleSideMenu}
                
            >
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
