cmake_minimum_required(VERSION 3.8)
project(time_opdracht)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(std_msgs REQUIRED)
#find_package(example_interfaces REQUIRED)
find_package(rosidl_default_generators REQUIRED)

set(msg_files
  "msg/TimeMsg.msg"
)

set(srv_files
  "srv/ServiceTypes.srv"
)

rosidl_generate_interfaces(${PROJECT_NAME}
  ${msg_files}
  ${srv_files}
)

ament_export_dependencies(rosidl_default_runtime)

add_executable(time_publisher src/time_publisher.cpp)
ament_target_dependencies(time_publisher rclcpp std_msgs)

add_executable(time_subscriber src/time_subscriber.cpp)
ament_target_dependencies(time_subscriber rclcpp)

add_executable(publisherOnOff_client src/publisherOnOff_client.cpp)
ament_target_dependencies(publisherOnOff_client rclcpp)

install(TARGETS
  time_publisher
  time_subscriber
  publisherOnOff_client
  DESTINATION lib/${PROJECT_NAME})

rosidl_get_typesupport_target(cpp_typesupport_target
  ${PROJECT_NAME} rosidl_typesupport_cpp)

target_link_libraries(time_publisher "${cpp_typesupport_target}")
target_link_libraries(time_subscriber "${cpp_typesupport_target}")
target_link_libraries(publisherOnOff_client "${cpp_typesupport_target}")

# uncomment the following section in order to fill in
# further dependencies manually.
# find_package(<dependency> REQUIRED)

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  # the following line skips the linter which checks for copyrights
  # comment the line when a copyright and license is added to all source files
  set(ament_cmake_copyright_FOUND TRUE)
  # the following line skips cpplint (only works in a git repo)
  # comment the line when this package is in a git repo and when
  # a copyright and license is added to all source files
  set(ament_cmake_cpplint_FOUND TRUE)
  ament_lint_auto_find_test_dependencies()
endif()

ament_package()
