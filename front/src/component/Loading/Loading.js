import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";

const Loading = ({coleur,prp}) => (
    <Section>
        {list
            .map(l => (
            <Article key={l.prop}>
                <ReactLoading type={l.prop} color={coleur} />
            </Article>
        ))}
    </Section>
);

export default Loading;