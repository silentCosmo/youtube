import axios from "axios";
import React from "react";

function CommentTranslation({props}) {
  const languages = [{lang:'Original',code:'og'},{lang:'English',code:'en'},{lang:'Malayalam',code:'ml'},{lang:'Tamil',code:'ta'},{lang:'Hindi',code:'hi'}]

  const getTranslated= async(la)=>{
    const options = {
      method: 'POST',
      url: 'https://free-google-translator.p.rapidapi.com/external-api/free-google-translator',
      params: {
        from: 'auto',
        to: la,
        query: props.commentBody
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_GT_RAPID_API,
        'x-rapidapi-host': 'free-google-translator.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        translate: 'rapidapi'
      }
    };
    
    try {
      const response = await axios.request(options);
       props.setTranslatedBody(response.data.translation)
    } catch (error) {
      console.error(error);
    }
  }

  const handleTranslate = (la)=>{
    if(la==='og'){
      props.setTranslateOptions(false)
      props.setTranslatedBody(false)
    }else{
      getTranslated(la)
    }
  }
  return (
    <div>
      <div className="comment_translation_languages">
        {languages.map((la) => (
          <div key={la.code} className="translate_language_btn" onClick={()=>handleTranslate(la.code)}>
            {la.lang}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentTranslation;
