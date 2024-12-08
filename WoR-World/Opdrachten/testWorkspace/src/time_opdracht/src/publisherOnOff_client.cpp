#include "rclcpp/rclcpp.hpp"
#include "time_opdracht/srv/service_types.hpp"

#include <chrono>
#include <memory>

using namespace std::chrono_literals;

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);

  if (argc != 2) {
      RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "usage: publisherOnOff_client on (or off)");
      return 1;
  }

  std::shared_ptr<rclcpp::Node> node = rclcpp::Node::make_shared("publisherOnOff_client");
  rclcpp::Client<time_opdracht::srv::ServiceTypes>::SharedPtr client =
    node->create_client<time_opdracht::srv::ServiceTypes>("onOff");

  auto request = std::make_shared<time_opdracht::srv::ServiceTypes::Request>();
  request->command = argv[1];

  while (!client->wait_for_service(1s)) {
    if (!rclcpp::ok()) {
      RCLCPP_ERROR(rclcpp::get_logger("rclcpp"), "Interrupted while waiting for the service. Exiting.");
      return 0;
    }
    RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "service not available, waiting again...");
  }

  auto result = client->async_send_request(request);
  // Wait for the result.
  if (rclcpp::spin_until_future_complete(node, result) ==
    rclcpp::FutureReturnCode::SUCCESS)
  {
    const char* response_string = ("response: " + result.get()->text).c_str();
    RCLCPP_INFO(rclcpp::get_logger("rclcpp"), response_string);
  } else {
    RCLCPP_ERROR(rclcpp::get_logger("rclcpp"), "Failed to call service on/off");
  }

  rclcpp::shutdown();
  return 0;
}
