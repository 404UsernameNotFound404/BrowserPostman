import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import Model from './Model';
import ContactModal from '../../Library/ContactModal';
import JSONInput from '../../Library/JSONInput/JSONInput';

const Component = styled.div`
    width: 100%;
    height: 49%;
    overflow-y: auto;
`;

const Title = styled.h1`
    text-align: center;
    width: 100%;
    font-size: 1.75em;
    color: white;
    text-decoration: underline;
    margin-bottom: 0.5em;
`;

const ModelTitleInput = styled.input`
    background-color: transparent;
    border: none;
    text-align: center;
    width: 100%;
    font-size: 1.75em;
    color: white;
    margin-bottom: 0.5em;
`;

type IconProps = {
    color: string
}

const Icon = styled.h4<IconProps>`
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-color: ${p => p.color};
    color: white;
    line-height: 2rem;
    text-align: center;
    font-size: 1.75em;
    margin: auto 0.2em;
    margin-top: 0.5em;
`;

type Props = {

}

function ModelMenu(props: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeModel, setActiveModel] = useState(null as any);
    const [tempModelName, setTempModelName] = useState("");
    const c = useContext(AppContext);

    useEffect(() => {
        if (!!activeModel) setTempModelName(activeModel.name);
    }, [activeModel])

    const addModelToBodyOrHeader = (copyToBody: boolean, modelName: string) => {
        c.folders = c.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) {
                    let modelToCopy = c.models.find(ele => ele.name == modelName);
                    if (copyToBody) return {...eleR, body: modelToCopy?.attributes}
                    else return {...eleR, headers: modelToCopy?.attributes}
                }
                return eleR;
            })
            return ele;
        })
        c.setFolders(c.folders);
    }

    const deleteModel = (name: string) => {
        c.models = c.models.filter(ele => !(ele.name == name))
        c.setModels(c.models);
    }

    const editModel = (newValue: any) => {
        c.models = c.models.map(ele => {
            if (ele.name == activeModel.name) {
                ele.attributes = newValue;
            }
            return ele;
        })
        // setActiveModel({ ...activeModel, name: e.target.value });
        c.setModels(c.models);
    }

    const startEditingModel = (name: string) => {
        setActiveModel(c.models.find(ele => ele.name == name));
        setModalOpen(true);
    }

    const editModelTitle = (value: string) => {
        c.models = c.models.map(ele => {
            if (ele.name == activeModel.name) {
                ele.name = value;
            }
            return ele;
        })
        c.setModels(c.models);
        setTempModelName(value);
    }

    const addNewPropertyOnModel = (newObject: any) => {
        // c.models = c.models.map(ele => {
        //     if (ele.name == activeModel.name) {
        //         console.log("trying to add")
        //         if (ele.attributes.key != undefined) ele.attributes.key = "value";
        //         else ele.attributes["key" + Math.floor(Math.random() * 100)] = "value";
        //     }
        //     return ele;
        // })
        c.models = {...c.models, ...newObject}
        c.setModels(c.models);
    }

    const deletePropertyOnModel = (propertyToDelete: string) => {
        c.models = c.models.map(ele => {
            if (ele.name == activeModel.name) {
                delete ele.attributes[propertyToDelete];
            }
            return ele;
        })
        c.setModels(c.models);
    }

    const addModel = () => {
        //check
        let newModel = {
            name: "name",
            attributes: {}
        };
        let newNameCount = 1;
        while(!!(c.models.find(ele => ele.name == newModel.name))) {
            newModel.name = "name" + "(" + newNameCount + ")";
            newNameCount++;
        }
        c.models = [...c.models, newModel];
        c.setModels(c.models);
    }

    return (
        <Component>
            <Title>Model Menu</Title>
            {
                c.models.map(ele => <Model addModelToBodyOrHeader = {addModelToBodyOrHeader} edit={startEditingModel} name={ele.name} deleteFunc={deleteModel} copy={addModelToBodyOrHeader} />)
            }
            <Icon onClick = {addModel} color={"green"}>+</Icon>
            <ContactModal darkTheme={true} close={modalOpen} setClose={setModalOpen}>
                {
                    activeModel != null ?
                        <>
                            <div style={{ height: "1em" }} />    {/* spacer */}
                            <ModelTitleInput value={tempModelName} onChange={(e: any) => {editModelTitle(e.target.value)}} />
                            <JSONInput data={activeModel.attributes} edit={editModel} addNewProperty={addNewPropertyOnModel} deleteProperty={deletePropertyOnModel} />
                            <div style={{ height: "1em" }} />    {/* spacer */}
                        </>
                        : ""
                }
            </ContactModal>
        </Component>
    )
}

export default ModelMenu;