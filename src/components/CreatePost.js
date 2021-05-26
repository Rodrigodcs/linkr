import styled from 'styled-components'

export default function CreatePost(){



    return(
        <CreatePostStyles>
            <div className="left-column">
                <div className="profile-picture"> 
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU" alt="profile"/>
                </div>
            </div>
            <div className="post-content">
                <p>O que você tem pra favoritar hoje?</p>
                <form>
                    <textarea placeholder="http://..."></textarea>
                </form>
            </div>
        </CreatePostStyles>
    )
}

const CreatePostStyles= styled.div`

width: 611px;
min-height: 209px;
background: #fff;
border-radius: 16px;
box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
padding: 16px 22px 16px 18px;
margin-bottom:29px;
display:flex;

.profile-picture{
    width:50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    img{
        width: 50px;
        height: 50px;
    }
}

.post-content{
    margin-left:18px;
    width: 100%;

    p{
        padding-top: 6px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 24px;
        color:#707070;
    }

    textarea{
        min-height:30px;
        min-width:503px;
        resize:auto;
        overflow: hidden;
        outline-style: none;
        border:none;
        border-radius:5px;
        background:#efefef;
        padding-top:10px;
    }
}

`
