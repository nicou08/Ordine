import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { supabase } from "../../../utils/supabase";

const { width, height } = Dimensions.get("window");

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface ReservationInfo {
  restaurant: string;
  date: string;
  time: string;
  seat_preference: string;
  participants: string;
  preordered_items: any;
  price_of_tax: number;
  price_of_items: number;
}

/*******************************************/
// Delete reservation from reservation ID
/*******************************************/
async function deleteReservation({
  reservation_id,
}: {
  reservation_id: string;
}) {
  console.log("CANCEL RESERVATION ID: ", reservation_id);
  let { data, error } = await supabase
    .from("Reservation Table")
    .delete()
    .eq("id", reservation_id);
}

/*******************************************/
// Update reservation from reservation ID
/*******************************************/
async function updateReservation({
  reservation_id,
}: {
  reservation_id: string;
}) {
  console.log("UPDATE RESERVATION ID: ", reservation_id);
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
    .select(
      "restaurant,date,time,seat_preference,participants,preordered_items,price_of_tax,price_of_items"
    )
    .eq("id", reservation_id);
  if (error) {
    console.log("error", error);
    return null;
  } else {
    return data;
  }
}

export default function ReservationScreen() {
  const searchParams = useLocalSearchParams();
  //console.log("SEARCH PARAMS", searchParams);

  // Modals
  const [modalCancelVisible, setCancelModalVisible] = useState(false);

  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
    restaurant: "",
    date: "",
    time: "",
    seat_preference: "",
    participants: "",
    preordered_items: [],
    price_of_tax: 0.0,
    price_of_items: 0.0,
  });
  const [reservationFormattedDate, setReservationFormattedDate] = useState("");

  // Fetch reservation info
  // useEffect(() => {
  //   if (searchParams.reservation_id) {
  //     fetchReservationInfo({
  //       reservation_id: searchParams.reservation_id as string,
  //     }).then((data) => {
  //       if (data) {
  //         setReservationInfo(data[0]);
  //         console.log("RESERVATION INFO", data);
  //       }
  //     });
  //   }
  // }, [searchParams.reservation_id]);
  const fetchReservationInfoCallback = useCallback(() => {
    if (searchParams.reservation_id) {
      fetchReservationInfo({
        reservation_id: searchParams.reservation_id as string,
      }).then((data) => {
        if (data) {
          setReservationInfo(data[0]);
          console.log("RESERVATION INFO", data);
        }
      });
    }
  }, [searchParams.reservation_id]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchReservationInfoCallback();

    const unsubscribe = navigation.addListener(
      "focus",
      fetchReservationInfoCallback
    );

    return unsubscribe;
  }, [navigation, fetchReservationInfoCallback]);

  // Format date
  useEffect(() => {
    if (reservationInfo?.date && reservationInfo.date !== "") {
      const date = new Date(reservationInfo.date + "T00:00");
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setReservationFormattedDate(formattedDate);
    }
  }, [reservationInfo?.date]);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#f5f5f5",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 30,
        }}
      >
        {/************************************************/}
        {/***********  RESERVATION INFORMATION ***********/}
        {/************************************************/}
        <View
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            paddingBottom: 15,
          }}
        >
          <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
            INFORMATION{" "}
          </Text>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: "#5e5e5e", fontSize: 17 }}>Date</Text>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>
              {reservationFormattedDate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: "#5e5e5e", fontSize: 17 }}>Time</Text>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>
              {reservationInfo.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: "#5e5e5e", fontSize: 17 }}>
              Seat Preference
            </Text>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>
              {reservationInfo.seat_preference}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: "#5e5e5e", fontSize: 17 }}>Participants</Text>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>
              {reservationInfo.participants}
            </Text>
          </View>
        </View>

        {/*******************************************/}
        {/***********  PREORDERED ITEMS  ************/}
        {/*******************************************/}
        <View
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            paddingBottom: 15,
          }}
        >
          <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
            PREORDERED ITEMS{" "}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {reservationInfo.preordered_items != null ? (
            <View>
              {reservationInfo.preordered_items.map(
                (item: CartItem, index: number) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      marginBottom: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        marginRight: 10,
                      }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{item.name}</Text>
                      <Text style={{ color: "#8c8c8c", fontSize: 18 }}>
                        ${Number(item.price).toFixed(2)} {"         "} x{" "}
                        {item.quantity}
                      </Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        ${Number(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 5,
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "black", fontWeight: "bold" }}
                >
                  SUBTOTAL
                </Text>
                <Text style={{ fontSize: 18 }}>
                  $
                  {reservationInfo.preordered_items
                    .reduce(
                      (total: number, menuItem: CartItem) =>
                        total + menuItem.quantity * menuItem.price,
                      0
                    )
                    .toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 5,
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "black", fontWeight: "bold" }}
                >
                  TAX
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  ${reservationInfo?.price_of_tax.toFixed(2)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "black", fontWeight: "bold" }}
                >
                  TOTAL
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="currency-usd"
                    size={50}
                    height={50}
                    width={45}
                    color="#CE3535"
                  />
                  <Text
                    style={{
                      color: "#CE3535",
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                  >
                    {reservationInfo?.price_of_items.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={{ height: 150 }}></View>
            </View>
          ) : (
            <View style={{ alignItems: "center", marginTop: 120 }}>
              <Text style={{ fontSize: 15, color: "#8c8c8c" }}>
                You have no preordered items
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/***************************************************************/}
      {/***********  PREORDER AND CANCEL RESERVATION BUTTON ***********/}
      {/***************************************************************/}
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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => setCancelModalVisible(true)}
          style={{
            backgroundColor: "#ededed",
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="trash-bin-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await updateReservation({
              reservation_id: searchParams.reservation_id as string,
            });
            router.push({
              pathname: "/reserving/updateReservation",
              params: {
                restaurantID: searchParams.restaurantID,
                name: searchParams.name,
                location: searchParams.location,
                distance: searchParams.distance,
                reservation_id: searchParams.reservation_id,
              },
            });
          }}
          style={{
            backgroundColor: "#ededed",
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="pencil" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/menu/:menu",
              params: {
                menu: searchParams.restaurantID,
                name: searchParams.name,
                location: searchParams.location,
                reservation_id: searchParams.reservation_id,
              },
            })
          }
          style={{
            backgroundColor: "#CE3535",
            height: 40,
            width: width * 0.6,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}>
            Pre order
          </Text>
        </TouchableOpacity>
      </View>

      {/******************************************************/}
      {/******************** CANCEL MODAL ********************/}
      {/******************************************************/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCancelVisible}
        onRequestClose={() => {
          setCancelModalVisible(!modalCancelVisible);
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
                backgroundColor: "white",
                borderRadius: 35,
                alignItems: "center",
                paddingTop: 14,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Image
                source={require("../../../assets/images/CancelReservImg.png")}
                style={{
                  width: 150,
                  height: 80,
                  backgroundColor: "white",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  paddingTop: 15,
                  paddingBottom: 20,
                }}
              >
                Are you sure you want to cancel this reservation?
              </Text>
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
                onPress={() => setCancelModalVisible(false)}
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
                onPress={async () => {
                  setCancelModalVisible(false);
                  await deleteReservation({
                    reservation_id: searchParams.reservation_id as string,
                  });
                  router.replace("/reservations");
                }}
              >
                <AntDesign name="check" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
