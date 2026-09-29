import React, { useState } from 'react'
import templates from '../flagdata';
import Link from 'next/link';


const ColoringOptions = () => {

    const [selectedTemplate, setSelectedTemplate] = useState(1);

    const changeTemplateClick = (id) => {
        setSelectedTemplate(id)
    }




    return (
        <div id='color-options'>
            <div id='color-option-header'>
                <h1>Choose a Template</h1>
            </div>

            <section id='template-options'>
                <div id='template-slider'>

                    {templates.map((template) => (
                        <div className={`template-slide ${template.id === selectedTemplate ? 'selected-template' : ''}  `}
                            key={template.id}
                            template={template}
                            onClick={() => changeTemplateClick(template.id)}
                        >
                            <img className={`${template.id === 13 || template.id === 14 ? 'preview-hat' : 'preview-small'}`} src={`${template.image}`}></img>
                        </div>
                    ))}

                </div>

                <div className='flag-preview'>
                    {templates.map((template) => {
                        if (template.id === selectedTemplate) {
                            return (
                                <div className='img-holder' key={template.id}>
                                    <img className={`large-image-view ${template.id === 13 || template.id === 14 ? 'full-img-hat' : ''}`} src={`${template.image}`} />
                                    <Link className='chs-tmplt' href={`/activities/coloring/${selectedTemplate}`} style={{ textDecoration: 'none' }}>
                                        <button className='choose-template-btn'>Start Drawing</button>
                                    </Link>
                                </div>
                            )
                        }
                    })}
                    {/* <div className='chose-template-btn-cntaner'>
                        <Link href={`/activities/coloring/${selectedTemplate}`} style={{ textDecoration: 'none', width: '200px' }}>
                            <button className='choose-template-btn'>Start Drawing</button>
                        </Link>
                    </div> */}



                </div>

            </section>

        </div>
    )
}

export default ColoringOptions

