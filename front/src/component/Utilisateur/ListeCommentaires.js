import React,{useState} from 'react';
import Loading from "../Loading/Loading";

function ListeCommentaires({data, id_jeu,loading}) {

    return (
        <>
            <h5>ÉVALUATIONS</h5>
            {/*** Liste des commentaires ***/}
            {
                loading&&<Loading coleur={'gray'}/>
            }
            {
                data &&
                data.filter((ele) => ele.id_jeu === parseInt(id_jeu))
                    .map((cmnt) => {
                        return (
                            <div key={cmnt.id_commentaire}>
                                <section>
                                    <div className="container p-2 text-dark">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-11 col-lg-9 col-xl-7">
                                                <div className="d-flex flex-start ">
                                                    <img className="rounded-circle shadow-1-strong me-3"
                                                         src={`http://127.0.0.1:8000/${cmnt.image}`}
                                                         alt="avatar" width="50"
                                                         height="50"/>
                                                    <div className="card w-100 bg-white text-white bg-opacity-10">
                                                        <div className="card-body  ">
                                                            <div className="">
                                                                <h5>{cmnt.user_name}</h5>
                                                                <p className="link-muted small">le {cmnt.created_at && cmnt.created_at.substring(0, 16).replace('T', ' à ')}</p>
                                                                <p>
                                                                    {cmnt.commentaire}
                                                                </p>

                                                                <div
                                                                    className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="#!" className="link-muted me-2">
                                                                            <i className="fas fa-thumbs-up me-1"></i>132
                                                                        </a>
                                                                        <a href="#!" className="link-muted">
                                                                            <i className="fas fa-thumbs-down me-1"></i>15
                                                                        </a>
                                                                    </div>
                                                                    <a href="#!" className="link-muted">
                                                                        <i className="fas fa-reply me-1"></i> Reply
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        )
                    })
            }
        </>
    );
}

export default ListeCommentaires;