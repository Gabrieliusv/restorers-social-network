import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Img from "./Images/About.jpg";

const useStyles = makeStyles({
  image: {
    width: "100%",
    height: "300px",
    backgroundImage: `url(${Img})`,
    backgroundSize: "cover",
    backgroundPosition: "0% 10%"
  },
  about: {
    margin: "60px 10%"
  }
});

function About(props) {
  const classes = useStyles();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Img;
    img.onload = () => {
      setImgLoaded(true);
    };
  }, []);

  return (
    <Fragment>
      {!imgLoaded ? null : (
        <Fragment>
          <div className={classes.image}></div>
          <div className={classes.about}>
            <p>
              Quis ullamco adipisicing nulla veniam nostrud nulla. Lorem
              incididunt non velit nostrud laboris exercitation amet cupidatat
              labore nulla minim amet elit. Incididunt aliqua labore incididunt
              exercitation aliqua ut pariatur id ipsum dolor consectetur.
              Adipisicing aliquip cupidatat laborum ullamco excepteur aliquip.
              Id eiusmod aliquip fugiat anim reprehenderit. Sit duis eiusmod sit
              esse velit eu pariatur. Culpa exercitation eiusmod est mollit sint
              consectetur ad nisi nulla. Cillum amet proident ad ad aute minim.
              Quis ipsum sint ad nostrud excepteur culpa ullamco labore nulla
              esse ullamco nisi ut. Excepteur sit deserunt labore non
              exercitation consectetur quis minim do sunt est non cupidatat ut.
              Ex nulla deserunt anim sint nisi amet. Aute anim labore minim
              minim. Ex exercitation mollit consequat incididunt occaecat. Elit
              nisi adipisicing veniam tempor aliqua ut pariatur excepteur cillum
              dolor excepteur laborum. Adipisicing aute magna nulla nostrud ex
              dolor aute in dolor Lorem et adipisicing et. Nisi sunt dolore
              velit amet minim labore adipisicing exercitation tempor esse eu.
              Amet consectetur ut exercitation esse qui cupidatat excepteur
              commodo ipsum. Officia culpa aute nostrud veniam nulla velit
              reprehenderit. Ipsum commodo consequat sunt est officia
              exercitation consectetur et est amet et ipsum. Eu qui ullamco aute
              pariatur. Tempor quis Lorem eu nulla ullamco aliquip eu occaecat
              aliquip et ex consequat qui. Anim labore pariatur voluptate aute
              officia. Duis duis et commodo reprehenderit magna duis. Anim ex
              irure culpa non occaecat laboris. Id irure ex fugiat veniam
              consectetur.
            </p>
            <p>
              Aliqua tempor consequat occaecat duis ipsum dolor do pariatur
              exercitation Lorem proident labore eiusmod. Anim velit
              exercitation laboris deserunt aute eiusmod aute laborum
              consectetur dolore qui consequat excepteur cillum. Laborum irure
              deserunt officia non cillum ea adipisicing aliqua irure labore
              commodo veniam magna qui. Nostrud cillum pariatur ad laborum elit
              non ipsum et qui enim aute aliqua nostrud. Dolor et proident
              voluptate veniam cillum exercitation labore. Commodo veniam
              officia voluptate laborum ullamco adipisicing adipisicing quis
              velit et dolore. Ipsum exercitation cupidatat nisi aliquip. Dolor
              duis irure adipisicing exercitation eu consectetur fugiat aute
              consequat. Velit sint adipisicing voluptate commodo minim velit
              dolor nisi laborum. Est reprehenderit labore non ut do magna enim
              Lorem exercitation aliqua elit. Qui et ut proident dolor in ad
              quis sint culpa. Id esse est consectetur ad proident velit est
              culpa nulla. Nisi tempor eiusmod nulla aliqua proident amet aliqua
              in quis aliquip. Elit aute ex minim amet qui eu exercitation.
              Mollit mollit irure enim culpa culpa labore officia elit irure
              adipisicing ullamco amet. Reprehenderit aute proident irure amet
              laborum. Amet id exercitation nostrud duis tempor est esse. Do
              ullamco esse tempor dolore. Amet incididunt cillum irure deserunt
              voluptate adipisicing duis quis et. Fugiat pariatur irure nostrud
              officia est enim et ad. Aliqua incididunt pariatur adipisicing
              velit sint sunt sunt dolor ullamco velit sint eiusmod eu
              excepteur. Ex nisi dolor veniam id aliqua officia ex enim do.
              Irure irure aute fugiat sit eiusmod consequat occaecat anim. Duis
              nulla excepteur esse excepteur non ullamco in cupidatat
              exercitation culpa sunt commodo reprehenderit.
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default About;
