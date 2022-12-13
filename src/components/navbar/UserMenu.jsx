import {makeStyles} from '@mui/styles'
import {Link} from 'react-router-dom'

 const useStyles =makeStyles({
    container:{
        position:'absolute',
        right:'0rem',
        top:'0rem',
        border:'.1rem solid',
        borderBottom:'none',
        width:'10rem',
        borderRadius:'.2rem',
        overflow: 'hidden',
    },
    item:{
        height:'3rem',
        backgroundColor:'var(--purple-2)',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom:'.1rem solid',
        fontWeight:'bold',
        transitionDuration:'.2s',
        textDecoration: 'none',
        color:'black',
        '&:hover':{
            backgroundColor:'var(--purple-1)',
            color:'white'
        }
    }
 })

const UserMenu = () => {
    const classes = useStyles();
    let settings=['Account','Register','Login','Logout'];

  return <div className={classes.container}>
    {settings.map(setting =><Link to={setting==='Account' ?'/profile':`/${setting.toLowerCase()}`} className={classes.item}>{setting}</Link>
    )}
  </div>
}

export default UserMenu