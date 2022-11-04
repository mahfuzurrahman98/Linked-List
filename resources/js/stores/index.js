import { defineStore } from "pinia";
// all input components
import InpBgColorField from "../components/input-fields/InpBgColorField.vue";
import InpBioField from "../components/input-fields/InpBioField.vue";
import InpColorField from "../components/input-fields/InpColorField.vue";
import InpContactField from "../components/input-fields/InpContactField.vue";
import InpEmailField from "../components/input-fields/InpEmailField.vue";
import InpFontField from "../components/input-fields/InpFontField.vue";
import InpImageField from "../components/input-fields/InpImageField.vue";
import InpLinkField from "../components/input-fields/InpLinkField.vue";
import InpLogoField from "../components/input-fields/InpLogoField.vue";
import InpNameField from "../components/input-fields/InpNameField.vue";
import InpVideoField from "../components/input-fields/InpVideoField.vue";
// all output components
import OutBioField from "../components/output-fields/OutBioField.vue";
import OutContactField from "../components/output-fields/OutContactField.vue";
import OutEmailField from "../components/output-fields/OutEmailField.vue";
import OutImageField from "../components/output-fields/OutImageField.vue";
import OutLinkField from "../components/output-fields/OutLinkField.vue";
import OutLogoField from "../components/output-fields/OutLogoField.vue";
import OutNameField from "../components/output-fields/OutNameField.vue";
import OutVideoField from "../components/output-fields/OutVideoField.vue";

import axios from "axios";

export const useDataStore = defineStore("data", {
    state: () => ({
        token: "",
        user: {},
        userAuthenticated: false,
        userId: 19,
        fields: [],
        refData: {
            uploadedLogo: "",
            uploadedImage: "",
            uploadedImages: [],
            fonts: [
                { id: 0, fontName: "San-serif", fontFamily: "sans-serif" },
                { id: 1, fontName: "Serif", fontFamily: "serif" },
                { id: 2, fontName: "Mono", fontFamily: "ubuntu" },
                { id: 2, fontName: "Cursive", fontFamily: "cursive" },
            ],
            fieldsTypeMap: {
                1: {
                    type: "Link",
                    inp: InpLinkField,
                    out: OutLinkField,
                },
                2: {
                    type: "Image",
                    inp: InpImageField,
                    out: OutImageField,
                },
                3: {
                    type: "Video",
                    inp: InpVideoField,
                    out: OutVideoField,
                },
                4: {
                    type: "Contact",
                    inp: InpContactField,
                    out: OutContactField,
                },
                5: {
                    type: "Email",
                    inp: InpEmailField,
                    out: OutEmailField,
                },
            },
            currentSelectedImage: -1,
            currentImagePropsId: -1,
            hasEmptyFields: false,
            deletedFieldIndex: -1,
            deletedFieldPropsId: -1,
            deletedFieldType: -1,
            successMessage: "",
            failureMessage: "",
        },
        fieldsData: {
            selectedTab: "profile",
            user: {},
            style: {
                color: "#000",
                bgColorType: "solid",
                bgColor: {
                    color1: "#FFF9F3",
                    color2: "#d71414",
                },
                fontFamily: "ubuntu",
            },
            links: [],
            uploadedImages: [],
            images: [],
            videos: [],
            contacts: [],
            emails: [],
        },
        fieldsMap: {
            logo: { inp: InpLogoField, out: OutLogoField },
            font: { inp: InpFontField },
            name: { inp: InpNameField, out: OutNameField },
            bio: { inp: InpBioField, out: OutBioField },
            link: { inp: InpLinkField, out: OutLinkField },
            image: { inp: InpImageField, out: OutImageField },
            video: { inp: InpVideoField, out: OutVideoField },
            contact: { inp: InpContactField, out: OutContactField },
            color: { inp: InpColorField },
            bgColor: { inp: InpBgColorField },
        },
    }),
    getters: {
        gradientBackground() {
            return (
                "linear-gradient(to bottom," +
                this.fieldsData.style.bgColor.color1 +
                " 0%, " +
                this.fieldsData.style.bgColor.color2 +
                " 100%)"
            );
        },
        formattedFields() {
            const fieldsData = [];
            this.fields.forEach((field, index) => {
                fieldsData.push({
                    userId: this.user.id,
                    typeId: field.typeId,
                    positionId: index,
                    propsId: field.propsId,
                    active: field.active,
                    deleted: field.deleted,
                });
            });
            return fieldsData;
        },
        formattedLinks() {
            const linksData = [];
            this.fieldsData.links.forEach((link, index) => {
                if (link.title != "" && link.value != "") {
                    linksData.push({
                        userId: this.user.id,
                        propsId: link.propsId,
                        title: link.title,
                        value: link.value,
                    });
                }
            });
            return linksData;
        },
        formattedImages() {
            const imagesData = [];
            this.fieldsData.images.forEach((image, index) => {
                if (image.title != "" && image.value != "") {
                    imagesData.push({
                        userId: this.user.id,
                        propsId: index,
                        title: image.title,
                        value: image.value,
                    });
                }
            });
            return imagesData;
        },
        formattedVideos() {
            const videosData = [];
            this.fieldsData.videos.forEach((video, index) => {
                if (video.title != "" && video.value != "") {
                    videosData.push({
                        userId: this.user.id,
                        propsId: index,
                        title: video.title,
                        value: video.value,
                    });
                }
            });
            return videosData;
        },
        formattedContacts() {
            const contactsData = [];
            this.fieldsData.contacts.forEach((contact, index) => {
                if (contact.value != "") {
                    contactsData.push({
                        userId: this.user.id,
                        propsId: index,
                        value: contact.value,
                    });
                }
            });
            return contactsData;
        },
        formattedEmails() {
            const emailsData = [];
            this.fieldsData.emails.forEach((email, index) => {
                if (email.value != "") {
                    emailsData.push({
                        userId: this.user.id,
                        propsId: index,
                        value: email.value,
                    });
                }
            });
            return emailsData;
        },
    },
    actions: {
        construct() {
            this.apiServer = "/api/";
            this.logoServer = "/uploads/restorants/";
            this.imageServer = "/uploads/field_images/";
        },
        selectTab(tab) {
            this.fieldsData.selectedTab = tab;
        },
        async getData() {
            // console.log("api/" + "get-theme/" + this.user.id);
            // return;
            let url = "";

            // get user data
            url = "api/get-user/" + this.user.username;
            try {
                let data = await axios.get(url);
                this.fieldsData.user = data.data;
                console.log("user: ", data.data);
            } catch (error) {
                alert(error);
            }

            // get style
            url = "api/get-theme/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = JSON.parse(data.data.json);
                this.fieldsData.style = data;
            } catch (error) {
                // alert("sdfsdfsadf");
            }

            // get links
            url = "api/get-links/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = data.data;

                let tempLinks = [];
                data.forEach((link, index) => {
                    tempLinks[link.props_id] = {
                        propsId: link.props_id,
                        title: link.title,
                        value: link.value,
                    };
                });
                console.log("links: ", tempLinks);
                this.fieldsData.links = tempLinks;
            } catch (error) {
                alert("error links");
            }

            // get images
            url = "api/get-images/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = data.data;

                let tempImages = [];
                data.forEach((image, index) => {
                    tempImages[image.props_id] = {
                        propsId: image.props_id,
                        title: image.title,
                        value: image.value,
                    };
                });
                this.fieldsData.images = tempImages;
            } catch (error) {
                alert(error);
            }

            // get videos
            url = "api/get-videos/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = data.data;

                let tempVideos = [];
                data.forEach((video, index) => {
                    tempVideos[video.props_id] = {
                        propsId: video.props_id,
                        title: video.title,
                        value: video.value,
                    };
                });
                this.fieldsData.videos = tempVideos;
            } catch (error) {
                alert(error);
            }

            // get contacts
            url = "api/get-contacts/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = data.data;

                let tempContacts = [];
                data.forEach((contact, index) => {
                    tempContacts[contact.props_id] = {
                        propsId: contact.props_id,
                        value: contact.value,
                    };
                });
                console.log("contacts: ", tempContacts);
                this.fieldsData.contacts = tempContacts;
            } catch (error) {
                alert(error);
            }

            // get fields
            url = "api/get-fields/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = data.data;
                let tempFields = [];
                data.forEach((field, index) => {
                    tempFields.push({
                        typeId: parseInt(field.type),
                        propsId: parseInt(field.props_id),
                        inp: this.refData.fieldsTypeMap[parseInt(field.type)]
                            .inp,
                        out: this.refData.fieldsTypeMap[parseInt(field.type)]
                            .out,
                        active: parseInt(field.active),
                        deleted: parseInt(field.deleted),
                    });
                });
                this.fields = tempFields;
                console.log("tmpff", tempFields);
            } catch (error) {
                alert("err");
            }
        },
        checkEmptyField() {
            // 0 for empty field, -1 for invalid video link, 1 for ok
            console.log("check empty callled: ", this.fieldsData.style);

            if (this.fieldsData.style.color == "") {
                this.refData.failureMessage = "Select the text color";
                return;
            } else if (this.fieldsData.style.bgColor.color1 == "") {
                this.refData.failureMessage = "Select background color";
                return;
            } else if (
                this.fieldsData.style.bgColorType == "gradient" &&
                this.fieldsData.style.bgColor.color2 == ""
            ) {
                this.refData.failureMessage = "Select background color";
                return;
            }

            for (let i = 0; i < this.fields.length; i++) {
                const field = this.fields[i];
                if (field.typeId == 1) {
                    // link
                    let link = this.fieldsData.links[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (link.title == "" || link.value == "") {
                            this.refData.failureMessage = "Fill the link field";
                            return;
                        }
                    }
                } else if (field.typeId == 2) {
                    // image
                    let image = this.fieldsData.images[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (image.title == "" || image.value == "") {
                            this.refData.failureMessage =
                                "Fill the image field";
                            return;
                        }
                    }
                } else if (field.typeId == 3) {
                    // video
                    let video = this.fieldsData.videos[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (video.title == "" || video.value == "") {
                            this.refData.failureMessage =
                                "Fill the video field";
                            return;
                        } else {
                            let url = video.value;
                            if (
                                !(
                                    url.includes("youtu.be/") ||
                                    url.includes("m.youtube.com/watch?v=") ||
                                    url.includes("www.youtube.com/watch?v=")
                                )
                            ) {
                                this.refData.failureMessage =
                                    "Invalid video link";
                                return;
                            }
                        }
                    }
                } else if (field.typeId == 4) {
                    // contact
                    let contact = this.fieldsData.contacts[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (contact.value == "") {
                            this.refData.failureMessage =
                                "Fill the phone field";
                            return;
                        }
                    }
                } else if (field.typeId == 5) {
                    // email
                    let email = this.fieldsData.emails[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (email.title == "" || email.value == "") {
                            this.refData.failureMessage =
                                "Fill the email field";
                            return;
                        }
                    }
                }
            }
        },
        async postData() {
            console.log("delete index: ", this.refData.deletedFieldIndex);

            this.checkEmptyField();

            if (this.refData.failureMessage != "") {
                return;
            }
            let url = "";

            // put name, bio, and logo
            let data = new FormData();
            data.append("u_logo", this.refData.uploadedLogo);
            data.append("name", this.fieldsData.user.name);
            data.append("bio", this.fieldsData.user.bio);

            url = "api/update-user/" + this.user.id;
            try {
                let resp = await axios.post(url, data);
            } catch (error) {
                alert(error);
                return;
            }

            // put style
            url = "api/update-theme/" + this.user.id;
            try {
                let resp = await axios.put(url, this.fieldsData.style);
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put links
            url = "api/update-links/" + this.user.id;
            try {
                let resp = await axios.put(url, this.formattedLinks, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put images
            url = "api/update-images/" + this.user.id;
            try {
                let resp = await axios.post(url, this.formattedImages, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put videos
            url = "api/update-videos/" + this.user.id;
            try {
                let resp = await axios.put(url, this.formattedVideos, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put contacts
            url = "api/update-contacts/" + this.user.id;
            try {
                let resp = await axios.put(url, this.formattedContacts, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put emails
            url = "api/update-emails/" + this.user.id;
            try {
                let resp = await axios.put(url, this.formattedEmails, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put fields
            url = "api/update-fields/" + this.user.id;
            try {
                let resp = await axios.put(url, this.formattedFields, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }
            this.refData.successMessage = "Successfully updated!";
        },
        async getAllImages() {
            let url = "api/get-image-gallery/" + this.user.id;
            try {
                let data = await axios.get(url);
                data = data.data;
                this.fieldsData.uploadedImages = data;
            } catch (error) {
                alert(error);
                return;
            }
        },
        async uploadImage() {
            console.log("async uploadImage");
            let formData = new FormData();
            formData.append("u_image", this.refData.uploadedImage);
            let url = "api/upload-image/" + this.user.id;
            try {
                let resp = await axios.post(url, formData);
                console.log(resp);
                this.getAllImages();
            } catch (error) {
                alert(error);
                return;
            }
        },
        setImageOnField() {
            this.fieldsData.images[this.refData.currentImagePropsId].value =
                this.fieldsData.uploadedImages[
                    this.refData.currentSelectedImage
                ].image;
        },
        enableDisable(fieldId) {
            console.log("enable disable: ", fieldId);
            this.fields[fieldId].active = !this.fields[fieldId].active;
        },
        removeField() {
            this.fields[this.refData.deletedFieldIndex].deleted = 1;
        },

        changeLogo(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            this.refData.uploadedLogo = files[0];
            this.fieldsData.user.logo = URL.createObjectURL(files[0]);
        },
        changeImageUploaded(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            this.refData.uploadedImage = files[0];

            setTimeout(() => {
                this.uploadImage();
            }, 500);
        },
        addLink() {
            const mxId = this.fieldsData.links.length;
            this.fieldsData.links.push({
                propsId: mxId,
                title: "",
                value: "",
            });
            console.log(this.fieldsData.links);
            this.fields.push({
                typeId: 1,
                propsId: mxId,
                inp: InpLinkField,
                out: OutLinkField,
                active: 1,
                deleted: 0,
            });
        },
        addImage() {
            const mxId = this.fieldsData.images.length;
            this.fieldsData.images.push({
                propsId: mxId,
                title: "",
                value: "",
            });
            this.fields.push({
                typeId: 2,
                propsId: mxId,
                inp: InpImageField,
                out: OutImageField,
                active: 1,
                deleted: 0,
            });
        },
        addVideo() {
            const mxId = this.fieldsData.videos.length;
            this.fieldsData.videos.push({
                propsId: mxId,
                title: "",
                value: "",
            });
            this.fields.push({
                typeId: 3,
                propsId: mxId,
                inp: InpVideoField,
                out: OutVideoField,
                active: 1,
                deleted: 0,
            });
        },
        addContact() {
            const mxId = this.fieldsData.contacts.length;
            this.fieldsData.contacts.push({ propsId: mxId, value: "" });
            this.fields.push({
                typeId: 4,
                propsId: mxId,
                inp: InpContactField,
                out: OutContactField,
                active: 1,
                deleted: 0,
            });
        },
        addEmail() {
            const mxId = this.fieldsData.emails.length;
            this.fieldsData.emails.push({
                propsId: mxId,
                title: "",
                value: "",
            });
            this.fields.push({
                typeId: 5,
                propsId: mxId,
                inp: InpEmailField,
                out: OutEmailField,
                active: 1,
                deleted: 0,
            });
        },
    },
});
