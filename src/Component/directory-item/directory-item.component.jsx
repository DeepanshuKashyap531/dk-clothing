import {BackgroundImage,Body,DirectoryItemContainer} from './directory-item.style'

import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({category})=>{
    const {imageUrl,title,route} = category
    const navigate = useNavigate();

    const onNavagateHandler = () => navigate(route)

   
    
    return(
        <DirectoryItemContainer onClick={onNavagateHandler}>
        <BackgroundImage
        imageUrl={imageUrl}
        />
        <Body className="body">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>  
    )
}

export default DirectoryItem;