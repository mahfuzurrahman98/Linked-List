import { defineStore } from "pinia";
// all input components
import InpBgColorField from "../components/input-fields/InpBgColorField.vue";
import InpBioField from "../components/input-fields/InpBioField.vue";
import InpColorField from "../components/input-fields/InpColorField.vue";
import InpContactField from "../components/input-fields/InpContactField.vue";
import InpDescField from "../components/input-fields/InpDescField.vue";
import InpFaqField from "../components/input-fields/InpFaqField.vue";
import InpFaqsField from "../components/input-fields/InpFaqsField.vue";
import InpFieldsView from "../components/input-fields/InpFieldsView.vue";
import InpFontField from "../components/input-fields/InpFontField.vue";
import InpImageField from "../components/input-fields/InpImageField.vue";
import InpItemField from "../components/input-fields/InpItemField.vue";
import InpLinkField from "../components/input-fields/InpLinkField.vue";
import InpLogoField from "../components/input-fields/InpLogoField.vue";
import InpNameField from "../components/input-fields/InpNameField.vue";
import InpVideoField from "../components/input-fields/InpVideoField.vue";
// all output components
import OutBioField from "../components/output-fields/OutBioField.vue";
import OutContactField from "../components/output-fields/OutContactField.vue";
import OutDescField from "../components/output-fields/OutDescField.vue";
import OutFaqField from "../components/output-fields/OutFaqField.vue";
import OutFaqsField from "../components/output-fields/OutFaqsField.vue";
import OutImageField from "../components/output-fields/OutImageField.vue";
import OutItemField from "../components/output-fields/OutItemField.vue";
import OutLinkField from "../components/output-fields/OutLinkField.vue";
import OutLogoField from "../components/output-fields/OutLogoField.vue";
import OutNameField from "../components/output-fields/OutNameField.vue";
import OutVideoField from "../components/output-fields/OutVideoField.vue";

import axios from "axios";

export const useDataStore = defineStore("data", {
    state: () => ({
        server: "https://kwikz.app/",
        // server: "http://127.0.0.1:8000/",
        shopId: 19,
        fonts: [
            { id: 0, fontName: "San-serif", fontFamily: "sans-serif" },
            { id: 1, fontName: "Serif", fontFamily: "serif" },
            { id: 2, fontName: "Mono", fontFamily: "ubuntu" },
        ],
        fields: [],
        refData: {
            uploadedLogo: "",
            uploadedImage: "",
            uploadedImages: [],
            fieldsTypeMap: {
                0: {
                    type: "Shop Card Text",
                    inp: InpItemField,
                    out: OutItemField,
                },
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
                    type: "Faqs",
                    inp: InpFaqsField,
                    out: OutFaqsField,
                },
                6: {
                    type: "Description",
                    inp: InpDescField,
                    out: OutDescField,
                },
                7: {
                    type: "Faq",
                    inp: InpFaqField,
                    out: OutFaqField,
                },
            },
            currentSelectedImage: -1,
            currentImagePropsId: -1,
            hasEmptyFields: false,
            faqAleadyAdded: false,
            deletedFieldIndex: -1,
            deletedFieldPropsId: -1,
            deletedFieldType: -1,
        },
        fieldsData: {
            selectedTab: "appearance",
            logo: "",
            name: "",
            shopText: "",
            subdomain: "",
            bio: "",
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
            faqs: [],
            descriptions: [],
            fieldsView: 1,
            categories: [],
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
            faqs: { inp: InpFaqsField, out: OutFaqsField },
            faq: { inp: InpFaqField, out: OutFaqField },
            desc: { inp: InpDescField, out: OutDescField },
            color: { inp: InpColorField },
            bgColor: { inp: InpBgColorField },
            item: { out: OutItemField },
            fieldView: { inp: InpFieldsView },
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
        formattedCards() {
            const cardsData = [];
            this.fields.forEach((field, index) => {
                cardsData.push({
                    shopId: this.shopId,
                    typeId: field.typeId,
                    positionId: index,
                    propsId: field.propsId,
                    active: field.active,
                    deleted: field.deleted,
                });
            });
            return cardsData;
        },
        formattedLinks() {
            const linksData = [];
            this.fieldsData.links.forEach((link, index) => {
                if (link.title != "" && link.value != "") {
                    linksData.push({
                        shopId: this.shopId,
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
                        shopId: this.shopId,
                        propsId: index,
                        title: image.title,
                        value: image.value,
                    });
                }
            });
            return imagesData;
        },
        formattedContacts() {
            const contactsData = [];
            this.fieldsData.contacts.forEach((contact, index) => {
                if (contact.value != "") {
                    contactsData.push({
                        shopId: this.shopId,
                        propsId: index,
                        value: contact.value,
                    });
                }
            });
            return contactsData;
        },
        formattedVideos() {
            const videosData = [];
            this.fieldsData.videos.forEach((video, index) => {
                if (video.title != "" && video.value != "") {
                    videosData.push({
                        shopId: this.shopId,
                        propsId: index,
                        title: video.title,
                        value: video.value,
                    });
                }
            });
            return videosData;
        },
        formattedFaqs() {
            const faqsData = [];
            this.fieldsData.faqs.forEach((faq, index) => {
                if (faq.question != "" && faq.answer != "") {
                    faqsData.push({
                        shopId: this.shopId,
                        propsId: index,
                        question: faq.question,
                        answer: faq.answer,
                    });
                }
            });
            return faqsData;
        },
        formattedDescriptions() {
            const descriptionsData = [];
            this.fieldsData.descriptions.forEach((description, index) => {
                if (description.title != "" && description.value != "") {
                    descriptionsData.push({
                        shopId: this.shopId,
                        propsId: index,
                        title: description.title,
                        value: description.value,
                    });
                }
            });
            return descriptionsData;
        },
        checkEmptyField() {
            // 0 for empty field, -1 for invalid video link, 1 for ok
            console.log("check empty callled");

            if (this.fieldsData.style.color == "") {
                return 3;
            }
            if (this.fieldsData.style.bgColor.color1 == "") {
                return 4;
            }
            if (
                this.fieldsData.style.bgColorType == "gradient" &&
                this.fieldsData.style.bgColor.color2 == ""
            ) {
                return 5;
            }

            if (this.fieldsData.shopText == "") {
                return 0;
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
                            console.log("link empty");
                            return 0;
                        }
                    }
                }
                if (field.typeId == 2) {
                    // image
                    let image = this.fieldsData.images[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (image.title == "" || image.value == "") {
                            console.log("image empty");
                            return 0;
                        }
                    }
                }
                if (field.typeId == 3) {
                    // video
                    let video = this.fieldsData.videos[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (video.title == "" || video.value == "") {
                            console.log("video empty");
                            return 0;
                        } else {
                            let url = video.value;
                            if (
                                !(
                                    url.includes("youtu.be/") ||
                                    url.includes("m.youtube.com/watch?v=") ||
                                    url.includes("www.youtube.com/watch?v=")
                                )
                            ) {
                                console.log("video empty 1");
                                return -1;
                            }
                        }
                    }
                }
                if (field.typeId == 4) {
                    // contact
                    let contact = this.fieldsData.contacts[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (contact.value == "") {
                            console.log("contact empty");
                            return 0;
                        }
                    }
                }
                if (field.typeId == 6) {
                    // contact
                    let description =
                        this.fieldsData.descriptions[field.propsId];
                    if (field.deleted == 1) {
                        // pass
                    } else {
                        if (
                            description.title == "" ||
                            description.value == ""
                        ) {
                            console.log("desc empty");
                            return 0;
                        }
                    }
                }
            }
            return 1;
        },
    },
    actions: {
        construct() {
            this.apiServer = "/api/";
            this.logoServer = "/uploads/restorants/";
            this.imageServer = "/uploads/card_images/";
        },
        selectTab(tab) {
            this.fieldsData.selectedTab = tab;
        },
        async getData() {
            // console.log("api/" + "get-shop-theme/" + this.shopId);
            // return;
            let url = "";
            // get name, logo, and bio
            // url = this.apiServer + "get-shop-data/" + this.shopId;
            // try {
            // 	let data = await axios.get(url);
            // 	data = data.data;
            // 	console.log("datas: ", data);
            // 	this.fieldsData.name = data.name;
            // 	this.fieldsData.subdomain = data.subdomain;
            // 	this.fieldsData.bio = data.description;
            // 	this.fieldsData.logo =
            // 		data.value != "" ? this.logoServer + data.value : "";
            // 	console.log("getData: ", this.fieldsData.logo);
            // } catch (error) {
            // 	alert(error);
            // }

            // get cats
            // url = this.apiServer + "get-shop-items/" + this.shopId;
            // try {
            //     let data = await axios.get(url);
            //     data = data.data;
            //     this.fieldsData.categories = data;
            //     console.log("categor: ", data);
            //     if (Object.keys(data).length > 0) {
            //         console.log("ache");
            //     } else {
            //         console.log("blank");
            //     }
            // } catch (error) {
            //     alert(error);
            // }

            // get fields view
            // url = this.apiServer + "get-shop-view/" + this.shopId;
            // try {
            //     let data = await axios.get(url);
            //     data = data.data;
            //     console.log("view: ", data);
            //     this.fieldsData.fieldsView = data;
            // } catch (error) {
            //     alert(error);
            // }

            // get online shop text
            // url = this.apiServer + "get-shop-text/" + this.shopId;
            // try {
            //     let data = await axios.get(url);
            //     data = data.data;
            //     console.log("online: ", data);
            //     this.fieldsData.shopText = data.text;
            // } catch (error) {
            //     alert(error);
            // }

            // get style
            url = this.apiServer + "get-shop-theme/" + this.shopId;
            try {
                let data = await axios.get(url);
                data = JSON.parse(data.data.json);
                this.fieldsData.style = data;
            } catch (error) {
                alert(error);
            }

            // get links
            url = this.apiServer + "get-shop-links/" + this.shopId;
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
                alert("error gdfg");
            }

            // get images
            url = this.apiServer + "get-shop-images/" + this.shopId;
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
            url = this.apiServer + "get-shop-videos/" + this.shopId;
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
            url = this.apiServer + "get-shop-contacts/" + this.shopId;
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

            // get descriptions
            url = this.apiServer + "get-shop-descriptions/" + this.shopId;
            try {
                let data = await axios.get(url);
                data = data.data;

                let tempDescriptions = [];
                data.forEach((description, index) => {
                    tempDescriptions[description.props_id] = {
                        propsId: description.props_id,
                        title: description.title,
                        value: description.value,
                    };
                });
                this.fieldsData.descriptions = tempDescriptions;
            } catch (error) {
                alert(error);
            }

            // get cards
            url = this.apiServer + "get-shop-cards/" + this.shopId;
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
        async postData() {
            console.log("delete index: ", this.refData.deletedFieldIndex);
            let flag = this.checkEmptyField;
            // console.log("isEmpty: ", isEmpty);
            // pre processing
            if (flag == 0) {
                alert("Card can't be empty");
                return;
            }
            if (flag == -1) {
                alert("Only valid youtube url is acceptable");
                return;
            }
            if (flag == 3) {
                alert("Text color field can't be empty");
                return;
            }
            if (flag == 4 && flag == 5) {
                alert("Background color field can't be empty");
                return;
            }

            let url = "";

            // put name, bio, and logo
            let data = new FormData();
            data.append("resto_wide_logo", this.refData.uploadedLogo);
            data.append("name", this.fieldsData.name);
            data.append("bio", this.fieldsData.bio);

            url = this.apiServer + "update-shop-data/" + this.shopId;
            try {
                let resp = await axios.post(url, data, {
                    headers: {
                        "Content-type": "mutipart/form-data",
                    },
                });
            } catch (error) {
                alert(error);
                return;
            }

            // put style
            url = this.apiServer + "update-shop-theme/" + this.shopId;
            try {
                let resp = await axios.put(url, this.fieldsData.style, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put links
            url = this.apiServer + "update-shop-links/" + this.shopId;
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
            url = this.apiServer + "update-shop-images/" + this.shopId;
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

            // put contacts
            url = this.apiServer + "update-shop-contacts/" + this.shopId;
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

            // put videos
            url = this.apiServer + "update-shop-videos/" + this.shopId;
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

            // put fieldsview
            url = this.apiServer + "update-shop-view/" + this.shopId;
            try {
                let resp = await axios.put(
                    url,
                    { view: this.fieldsData.fieldsView },
                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                );
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put online shop text
            url = this.apiServer + "update-shop-text/" + this.shopId;
            try {
                let resp = await axios.put(
                    url,
                    { text: this.fieldsData.shopText },
                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                );
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put descriptions
            url = this.apiServer + "update-shop-descriptions/" + this.shopId;
            try {
                let resp = await axios.put(url, this.formattedDescriptions, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }

            // put cards
            url = this.apiServer + "update-shop-cards/" + this.shopId;
            try {
                let resp = await axios.put(url, this.formattedCards, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                console.log(resp);
            } catch (error) {
                alert(error);
                return;
            }
            alert("Changes have been saved successfully");
        },
        async getAllImages() {
            let url =
                this.apiServer + "get-all-uploaded-shop-images/" + this.shopId;
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
            let url = this.apiServer + "upload-shop-image/" + this.shopId;
            try {
                let resp = await axios.post(url, formData, {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                });
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
            this.fieldsData.logo = URL.createObjectURL(files[0]);
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
            this.fieldsData.links.push({ propsId: mxId, title: "", value: "" });
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
        addFaq() {
            const mxId = this.fieldsData.faqs.length;
            this.fieldsData.faqs.push({
                propsId: mxId,
                question: "",
                answer: "",
            });
            this.fields.push({
                typeId: 7,
                propsId: mxId,
                inp: InpFaqField,
                out: OutFaqField,
                active: 1,
                deleted: 0,
            });
        },
        addFaqs() {
            let found = this.fields.find((field) => field.typeId == 5);
            console.log("add faqs called: ", found);
            if (!found) {
                this.addFaq();
                this.fields.push({
                    typeId: 5,
                    propsId: 0,
                    inp: InpFaqsField,
                    out: OutFaqsField,
                    active: 1,
                    deleted: 0,
                });
            }
        },
        addDescription() {
            const mxId = this.fieldsData.descriptions.length;
            this.fieldsData.descriptions.push({
                propsId: mxId,
                title: "",
                value: "",
            });
            this.fields.push({
                typeId: 6,
                propsId: mxId,
                inp: InpDescField,
                out: OutDescField,
                active: 1,
                deleted: 0,
            });
        },
    },
});
