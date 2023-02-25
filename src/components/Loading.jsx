import { makeStyles } from "@mui/styles"

const useStyles =makeStyles({
    '@keyframes myAnim': {
        '0% 100%' :{
            transform: 'translateY(0)',
        },
    
        '10%  30%  50%  70%' : {
            transform: 'translateY(1rem)',
        },
    
        '20% 40% 60%' : {
            transform: 'translateY(2rem)',
        },
    
        '80%': {
            transform: 'translateY(1rem)',
        },
    
        '90%': {
            transform: 'translateY(0px)',
        }
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    span:{
        fontSize:'2rem',
        color:'var(--purple-1)'
    },
    span1:{
        animation: '$myAnim 1s linear 0s infinite normal both'
    },
    span2:{
        animation: '$myAnim 2s ease 0s infinite normal both'
    },
    span3:{
        animation: '$myAnim 3s ease 0s infinite normal both'
    },
    span4:{
        animation: '$myAnim 4s ease 0s infinite normal both'
    },
    span5:{
        animation: '$myAnim 5s ease 0s infinite normal both'
    },
    span6:{
        animation: '$myAnim 6s ease 0s infinite normal both'
    },
    span7:{
        animation: '$myAnim 7s ease 0s infinite normal both'
    },
    span8:{
        animation: '$myAnim 8s ease 0s infinite normal both'
    },
    span9:{
        animation: '$myAnim 9s ease 0s infinite normal both'
    },
    span10:{
        animation: '$myAnim 10s ease 0s infinite normal both'
    },
    span11:{
        animation: '$myAnim 11s ease 0s infinite normal both'
    },
    span12:{
        animation: '$myAnim 12s ease 0s infinite normal both'
    },
    span13:{
        animation: '$myAnim 13s ease 0s infinite normal both'
    },
})

const Loading = () => {
    const classes=useStyles()
  return (
    <div className={classes.container}>
        <span className={`${classes.span1} ${classes.span}`}>C</span>
        <span className={`${classes.span2} ${classes.span}`}>O</span>
        <span className={`${classes.span3} ${classes.span}`}>N</span>
        <span className={`${classes.span4} ${classes.span}`}>N</span>
        <span className={`${classes.span5} ${classes.span}`}>E</span>
        <span className={`${classes.span6} ${classes.span}`}>C</span>
        <span className={`${classes.span7} ${classes.span}`}>T</span>
        <span className={`${classes.span8} ${classes.span}`}>I</span>
        <span className={`${classes.span9} ${classes.span}`}>N</span>
        <span className={`${classes.span10} ${classes.span}`}>G</span>
        <span className={`${classes.span11} ${classes.span}`}>.</span>
        <span className={`${classes.span12} ${classes.span}`}>.</span>
        <span className={`${classes.span13} ${classes.span}`}>.</span>
    </div>
  )
}
export default Loading