import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ScrollView,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import Accordion from "react-native-collapsible/Accordion";
import { Icon, Header, Card } from "react-native-elements";
import colors from "../colors.json";
import * as Animatable from "react-native-animatable";

export default function FAQ(props) {
  const faqs = [
    {
      title: "How long does it take to ship my order?",
      content:
        "Orders are usually shipped within 1-2 business days after placing the order.",
    },
    {
      title: "When will my order arrive?",
      content:
        "Shipping time is set by our delivery partners, according to the delivery method chosen by you. Additional details can be found in the order confirmation email you’ve received.",
    },
    {
      title: "How do I track my order?",
      content:
        "Once shipped, you’ll get a confirmation email that includes a tracking number and additional information regarding tracking your order.",
    },
    {
      title: "What’s your return policy?",
      content:
        "We allow the return of all items within 30 days of your original order’s date. If you’re interested in returning your items, send us an email with your order number and we’ll ship a return label.",
    },
    {
      title: "How do I make changes to an existing order?",
      content:
        "Changes to an existing order can be made as long as the order is still in “processing” status. Please contact our team via email and we’ll make sure to apply the needed changes. If your order has already been shipped, we cannot apply any changes to it. If you are unhappy with your order when it arrives, please contact us for any changes you may require.",
    },
    {
      title: "What shipping options do you have?",
      content: "For USA domestic orders we offer FedEx and USPS shipping.",
    },
    {
      title: "Do you ship internationally?",
      content: "We currently ship to the USA, Canada, UK and Australia.",
    },
    {
      title: "Do you sell gift cards?",
      content:
        "We offer the option to purchase a gift card in our store. Contact us via email to learn about the different available options.",
    },
    {
      title: " Can I receive a refund?",
      content:
        "If you are unhappy with the product you’ve received, you can get a refund.",
    },
  ];
  const [activeSections, setActiveSections] = useState([]);

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  const renderContent = (section, i, isActive, sections) => {
    return (
      <Card>
        {isActive && (
          <Animatable.Text
            duration={300}
            easing="ease-out"
            animation={isActive ? "zoomIn" : false}
            style={styles.contentText}
          >
            {section.content}
          </Animatable.Text>
        )}
      </Card>
    );
  };

  const renderHeader = (section, index, isActive, sections) => {
    return (
      <Card>
        <Card.Title style={styles.headerText}>{`${index + 1}. ${
          section.title
        }`}</Card.Title>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        containerStyle={{
          borderBottomColor: colors.main,
          borderBottomWidth: 1,
        }}
        backgroundColor={colors.main}
        leftComponent={
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              name="arrow-back"
              type="ionicon"
              color={colors.white}
              size={25}
            />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.textStyle}>FAQ</Text>}
      />
      <Accordion
        underlayColor={colors.background}
        sections={faqs}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  textStyle: {
    fontFamily: "Montserrat-Medium",
    color: colors.white,
    fontSize: 20,
  },
  headerText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    textAlign: "left",
  },

  contentText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    textAlign: "left",
  },
});
