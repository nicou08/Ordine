import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
  Modal,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { supabase } from "../../../utils/supabase";
import Carousel from "react-native-reanimated-carousel";
import { Calendar } from "react-native-calendars";

const { width, height } = Dimensions.get("window");

interface ReservationInfo {
  date: string;
  time: string;
  seat_preference: string;
  participants: number;
}

/**************************/
// Update reservation info
/**************************/
async function updateReservation({
  reservation_id,
  date,
  time,
  seat_preference,
  participants,
}: {
  reservation_id: string;
  date: string;
  time: string;
  seat_preference: string;
  participants: number;
}) {
  console.log(
    "UPDATE RESERVATION new values:: ",
    date,
    time,
    seat_preference,
    participants
  );
  let { data, error } = await supabase
    .from("Reservation Table")
    .update({
      date: date,
      time: time,
      seat_preference: seat_preference,
      participants: participants,
    })
    .eq("id", reservation_id);
  if (error) {
    console.log("error", error);
    return null;
  } else {
    return data;
  }
}

/*******************************************/
// Get reservations info from reservation ID
/*******************************************/
async function fetchReservationInfo({
  reservation_id,
}: {
  reservation_id: string;
}) {
  let { data, error } = await supabase
    .from("Reservation Table")
    .select("date,time,seat_preference,participants")
    .eq("id", reservation_id);
  if (error) {
    console.log("error", error);
    return null;
  } else {
    return data;
  }
}

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

export default function UpdateReservationScreen() {
  const searchParams = useLocalSearchParams();
  console.log("UPDATE RESERVATION PARAMS", searchParams);

  // Reservation Info Chunk
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
    date: "",
    time: "",
    seat_preference: "",
    participants: 0,
  });

  // Reservation Info
  const [reservationDate, setReservationDate] = useState("");
  const [reservationFormattedDate, setReservationFormattedDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationPeople, setReservationPeople] = useState(0);
  const [reservationSeatPreference, setReservationSeatPreference] =
    useState("");

  // Fetch current reservation info
  useEffect(() => {
    fetchReservationInfo({
      reservation_id: searchParams.reservation_id as string,
    }).then((data) => {
      if (data) {
        setReservationInfo(data[0]);
        setReservationDate(data[0].date);
        setReservationTime(data[0].time);
        setReservationPeople(data[0].participants);
        setReservationSeatPreference(data[0].seat_preference);

        // Formatted date
        const date = new Date(data[0].date + "T00:00");
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setReservationFormattedDate(formattedDate);

        console.log("GREGARIOUS", data);
      }
    });
  }, []);

  // Modals
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [modalTimeVisible, setModalTimeVisible] = useState(false);
  const [modalPeopleVisible, setModalPeopleVisible] = useState(false);
  const [modalSeatPreferenceVisible, setModalSeatPreferenceVisible] =
    useState(false);

  // Calendar Picker
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  //console.log("minDate: ", minDate);

  // Time Picker
  const [pmSelected, setPmSelected] = useState(true);
  const [activeHourIndex, setActiveHourIndex] = useState(0);
  const [activeMinuteIndex, setActiveMinuteIndex] = useState(0);
  const hoursMorning = [
    "00",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  const hoursAfternoon = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  // People Picker
  const [activePeopleIndex, setActivePeopleIndex] = useState(0);
  const numberPeople = [1, 2, 3, 4, 5, 6, 7];

  // Set Preference Picker
  const [activePreferenceIndex, setActivePreferenceIndex] = useState<number>();
  const seatsPreferences = ["Regular", "By window", "Booth", "Patio"];

  // Format date
  useEffect(() => {
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
      {/***************************/}
      {/****** CALENDAR DATE ******/}
      {/***************************/}
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

      {/*************************/}
      {/****** TIME PICKER ******/}
      {/*************************/}
      <Pressable
        onPress={() => {
          //ashowTimePicker();
          setModalTimeVisible(true);
        }}
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
          {reservationTime}
        </Text>
      </Pressable>

      {/**************************/}
      {/****** PARTICIPANTS ******/}
      {/**************************/}
      <Pressable
        onPress={() => setModalPeopleVisible(true)}
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
          {reservationPeople}
        </Text>
      </Pressable>

      {/*****************************/}
      {/****** SEAT PREFERENCE ******/}
      {/*****************************/}
      <Pressable
        onPress={() => setModalSeatPreferenceVisible(true)}
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
          {reservationSeatPreference}
        </Text>
      </Pressable>

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
          onPress={async () => {
            await updateReservation({
              reservation_id: searchParams.reservation_id as string,
              date: reservationDate,
              time: reservationTime,
              participants: reservationPeople,
              seat_preference: reservationSeatPreference,
            });
            router.replace("/reservations");
          }}
          style={{
            backgroundColor: "#CE3535",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}>
            Update Reservation
          </Text>
        </Pressable>
      </View>

      {/********************************************************************/}
      {/******************** CALENDAR DATE PICKER MODAL ********************/}
      {/********************************************************************/}
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
            <TouchableOpacity
              style={{
                marginLeft: 10,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => setModalCalendarVisible(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ width: 10 }}></View>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/***********************************************************/}
      {/******************** TIME PICKER MODAL ********************/}
      {/***********************************************************/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalTimeVisible}
        onRequestClose={() => {
          setModalTimeVisible(!modalTimeVisible);
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
                //height: 250,
                backgroundColor: "white",
                borderRadius: 35,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  //backgroundColor: "pink",
                  //width: width * 0.6,
                  height: Platform.OS === "android" ? 220 : 200,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setPmSelected(false)}
                    style={{
                      backgroundColor: pmSelected ? "white" : "#f1f1f1",
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: pmSelected ? "#5e5e5e" : "#CE3535",
                        fontWeight: "600",
                      }}
                    >
                      AM
                    </Text>
                  </Pressable>
                  <View style={{ width: 20 }}></View>
                  <Pressable
                    onPress={() => setPmSelected(true)}
                    style={{
                      backgroundColor: pmSelected ? "#f1f1f1" : "white",
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: pmSelected ? "#CE3535" : "#5e5e5e",
                        fontWeight: "600",
                      }}
                    >
                      PM
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flex: 1,
                    // backgroundColor: "red",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: "white",
                      height: 160,
                      overflow: "hidden",
                    }}
                  >
                    <Carousel
                      vertical={true}
                      height={60}
                      width={100}
                      data={pmSelected ? hoursAfternoon : hoursMorning}
                      scrollAnimationDuration={600}
                      onSnapToItem={(index) => setActiveHourIndex(index)}
                      renderItem={({ index }) => {
                        return (
                          <View
                            style={{
                              //backgroundColor: "white",
                              width: 60,
                              height: 40,
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: 10,
                              marginLeft: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                                color:
                                  index === activeHourIndex
                                    ? "black"
                                    : "#bababa",
                                fontWeight:
                                  index === activeHourIndex ? "bold" : "normal",
                              }}
                            >
                              {pmSelected
                                ? hoursAfternoon[index]
                                : hoursMorning[index]}
                            </Text>
                          </View>
                        );
                      }}
                      style={{
                        backgroundColor: "#f1f1f1",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "visible",
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: "#f1f1f1",
                      width: 20,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>:</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: "white",
                      height: 160,
                      overflow: "hidden",
                    }}
                  >
                    <Carousel
                      vertical={true}
                      height={60}
                      width={100}
                      data={minutes}
                      scrollAnimationDuration={600}
                      onSnapToItem={(index) => setActiveMinuteIndex(index)}
                      renderItem={({ index }) => {
                        return (
                          <View
                            style={{
                              //backgroundColor: "white",
                              width: 60,
                              height: 40,
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: 10,
                              marginLeft: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                                color:
                                  index === activeMinuteIndex
                                    ? "black"
                                    : "#bababa",
                                fontWeight:
                                  index === activeMinuteIndex
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {minutes[index]}
                            </Text>
                          </View>
                        );
                      }}
                      style={{
                        backgroundColor: "#f1f1f1",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "visible",
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                      }}
                    />
                  </View>
                </View>
              </View>
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
            <TouchableOpacity
              style={{
                marginLeft: 10,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setActiveHourIndex(0);
                setActiveMinuteIndex(0);
                setModalTimeVisible(false);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ width: 10 }}></View>
            <TouchableOpacity
              style={{
                marginRight: 10,
                backgroundColor: "#CE3535",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setReservationTime(
                  `${
                    pmSelected
                      ? hoursAfternoon[activeHourIndex]
                      : hoursMorning[activeHourIndex]
                  }:${minutes[activeMinuteIndex]} ${pmSelected ? "pm" : "am"}`
                );
                setActiveHourIndex(0);
                setActiveMinuteIndex(0);
                setModalTimeVisible(false);
              }}
            >
              <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/****************************************************************/}
      {/******************** NUMBER OF PEOPLE MODAL ********************/}
      {/****************************************************************/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPeopleVisible}
        onRequestClose={() => {
          setModalTimeVisible(!modalPeopleVisible);
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
                height: 80,
                backgroundColor: "white",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                {numberPeople.map((number, index) => (
                  <Pressable
                    onPress={() => setActivePeopleIndex(index)}
                    key={index}
                    style={{
                      backgroundColor:
                        activePeopleIndex === index ? "#CE3535" : "white",
                      borderRadius: 50,
                      height: 42,
                      width: 42,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 21,
                        color: activePeopleIndex === index ? "white" : "black",
                      }}
                    >
                      {number}
                    </Text>
                  </Pressable>
                ))}
              </View>
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
            <TouchableOpacity
              style={{
                marginLeft: 10,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setModalPeopleVisible(false);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ width: 10 }}></View>
            <TouchableOpacity
              style={{
                marginRight: 10,
                backgroundColor: "#CE3535",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setReservationPeople(numberPeople[activePeopleIndex]);
                setModalPeopleVisible(false);
              }}
            >
              <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/***************************************************************/}
      {/******************** SEAT PREFERENCE MODAL ********************/}
      {/***************************************************************/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSeatPreferenceVisible}
        onRequestClose={() => {
          setModalSeatPreferenceVisible(!modalSeatPreferenceVisible);
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
                //height: 80,
                backgroundColor: "white",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 15,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {seatsPreferences.map((seat, index) => (
                <View key={index}>
                  <Pressable
                    onPress={() => setActivePreferenceIndex(index)}
                    key={index}
                    style={{
                      backgroundColor:
                        activePreferenceIndex === index ? "#CE3535" : "white",
                      borderRadius: 50,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 21,
                        color:
                          activePreferenceIndex === index ? "white" : "black",
                      }}
                    >
                      {seat}
                    </Text>
                  </Pressable>
                  <View style={{ height: 5 }}></View>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                marginLeft: 10,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setModalSeatPreferenceVisible(false);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ width: 10 }}></View>
            <TouchableOpacity
              style={{
                marginRight: 10,
                backgroundColor: "#CE3535",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setReservationSeatPreference(
                  seatsPreferences[activePreferenceIndex as number]
                );
                setModalSeatPreferenceVisible(false);
              }}
            >
              <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
