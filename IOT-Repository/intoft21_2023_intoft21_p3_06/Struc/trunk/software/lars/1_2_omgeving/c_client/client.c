#include <netdb.h> // struct hostent, gethostbyname
#include <netinet/in.h> // struct sockaddr_in, struct sockaddr

#include <stdio.h> // printf, sprintf
#include <stdlib.h> // exit
#include <string.h> // memcpy, memset
#include <sys/socket.h> // socket, connect
#include <unistd.h> // read, write, close


// https://github.com/Caltech-IPAC/Montage/issues/5
#define h_addr h_addr_list[0]
void error(const char* msg) {
perror(msg);
exit(0);
}
int main(int argc, char* argv[]) {


/* first what are we going to send and where are we going
* to send it? */
int portno = 80;
char* host = "192.168.1.51";
char* message_fmt = "%s %s HTTP/1.0\r\nHost: %s\r\n\r\n";
struct hostent* server;
struct sockaddr_in serv_addr;
int sockfd, bytes, sent, received, total;
char message[1024], response[4096];
if (argc < 3) {
puts("Parameters: <method> <request-URI>, e.g.: GET /");
exit(0);
}


/* fill in the parameters */
sprintf(message, message_fmt, argv[1], argv[2], host);
printf("Request:\n%s\n", message);


/* create the socket */
sockfd = socket(AF_INET, SOCK_STREAM, 0);
if (sockfd < 0)
error("ERROR opening socket");


/* lookup the ip address */
server = gethostbyname(host);
if (server == NULL)
error("ERROR, no such host");


/* fill in the structure */
memset(&serv_addr, 0, sizeof(serv_addr));
serv_addr.sin_family = AF_INET;
serv_addr.sin_port = htons(portno);
memcpy(&serv_addr.sin_addr.s_addr, server->h_addr,
server->h_length);


/* connect the socket */
if (connect(sockfd, (struct sockaddr*)&serv_addr,
sizeof(serv_addr)) < 0)
error("ERROR connecting");


/* send the request */
total = strlen(message);
sent = 0;
do {
bytes = write(sockfd, message + sent, total - sent);
if (bytes < 0)
error("ERROR writing message to socket");
if (bytes == 0)
break;
sent += bytes;
} while (sent < total);


/* receive the response */
memset(response, 0, sizeof(response));
total = sizeof(response) - 1;
received = 0;

do {
bytes =
read(sockfd, response + received, total - received);

if (bytes < 0)
error("ERROR reading response from socket");

if (bytes == 0)
break;
received += bytes;
} while (received < total);

if (received == total)
error("ERROR storing complete response from socket");

/* close the socket */
close(sockfd);

/* process response */
printf("Response:\n%s\n", response);
return 0;
}
