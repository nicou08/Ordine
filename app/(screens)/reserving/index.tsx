import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Modal,
  Platform,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { Calendar, LocaleConfig } from "react-native-calendars";

const { width, height } = Dimensions.get("window");

function LeftArrow() {
  return (
    <View
      style={{
        width: 38,
        height: 38,
        backgroundColor: "#F1F1F1",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Entypo name="chevron-left" size={17} color="#8c8c8c" />
    </View>
  );
}
function RightArrow() {
  return (
    <View
      style={{
        width: 38,
        height: 38,
        backgroundColor: "#F1F1F1",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Entypo name="chevron-right" size={17} color="#8c8c8c" />
    </View>
  );
}

export default function ReservingScreen() {
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);

  // Calendar
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  //console.log("minDate: ", minDate);

  // Reservation Info
  const [reservationDate, setReservationDate] = useState(minDate);
  const [reservationFormattedDate, setReservationFormattedDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationPeople, setReservationPeople] = useState(0);
  const [reservationSeat, setReservationSeat] = useState("");

  useEffect(() => {
    console.log("RESERVATION DATE: ", reservationDate);
    const date = new Date(reservationDate + "T00:00");
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setReservationFormattedDate(formattedDate);
  }, [reservationDate]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Pressable
        onPress={() => setModalCalendarVisible(true)}
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: "100%",
          //width: width * 0.85,
          alignItems: "center",
          marginTop: 40,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            fontSize: 16,

            color: "#5e5e5e",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Date
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {reservationFormattedDate}
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: "100%",
          //width: width * 0.85,
          alignItems: "center",
          marginTop: 15,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            fontSize: 16,

            color: "#5e5e5e",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Time
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          2:25 PM
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: "100%",
          //width: width * 0.85,
          alignItems: "center",
          marginTop: 15,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            fontSize: 16,

            color: "#5e5e5e",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          People
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          6
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: "100%",
          //width: width * 0.85,
          alignItems: "center",
          marginTop: 15,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            fontSize: 16,

            color: "#5e5e5e",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Seat
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          By window
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: width,
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "white",
          borderTopWidth: 0.2,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#CE3535",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}>
            Reserve
          </Text>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCalendarVisible}
        onRequestClose={() => {
          setModalCalendarVisible(!modalCalendarVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{}}>
            <View
              style={{
                width: width * 0.9,
                height: 388,
                backgroundColor: "white",
                borderRadius: 35,
                alignItems: "center",
                paddingTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Calendar
                style={{
                  height: 310,
                  width: 300,
                }}
                theme={{
                  todayTextColor: "#CE3535",
                  textDayStyle: {
                    color: "black",
                    fontSize: 17,
                  },
                }}
                initialDate={minDate}
                minDate={minDate}
                showSixWeeks={false}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  console.log("selectedDate: ", day.dateString);
                  //setModalVisible(false);
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: "#CE3535",
                  },
                }}
                renderArrow={(direction) =>
                  direction === "left" ? <LeftArrow /> : <RightArrow />
                }
                renderHeader={(date) => {
                  const monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  const month = monthNames[date.getMonth()];
                  const year = date.getFullYear();
                  return (
                    <View
                      style={{
                        height: 38,
                        backgroundColor: "#F1F1F1",
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: "#CE3535",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {`${month} ${year}`}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              //backgroundColor: "white",
              flexDirection: "row",
              paddingTop: 20,
              //alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Pressable
              style={{
                marginLeft: 10,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => setModalCalendarVisible(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <View style={{ width: 10 }}></View>
            <Pressable
              style={{
                marginRight: 10,
                backgroundColor: "#CE3535",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setReservationDate(selectedDate);
                setModalCalendarVisible(false);
                //console.log("RESERVATION DATE: ", reservationDate);
              }}
            >
              <AntDesign name="check" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
