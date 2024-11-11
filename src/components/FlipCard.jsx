import { Button } from 'antd';
import './FlipCard.css';

export default function ({ title, subTitle, backText, buttonText, onClick }) {
    return (
        <div class="flip-card-mod">
            <div class="flip-card-mod-inner">
                <div class="flip-card-mod-front">
                    <p class="title">{title}</p>
                    <p>{subTitle}</p>
                </div>
                <div class="flip-card-mod-back" >
                    <p class="title">{backText}</p>
                    <div style={{ textAlign:"center" }}>
                        {buttonText && (<Button onClick={onClick} type="primary" style={{borderRadius:"8px"}}>
                            {buttonText}
                        </Button>)}
                        
                    </div>

                </div>
            </div>
        </div>
    )
}