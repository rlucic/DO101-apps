FROM registry.access.redhat.com/rhscl/httpd-24-rhel7

ADD ./loop.sh /loop.sh
RUN chmod 777 /loop.sh
CMD ["/bin/sh", "-c", "/loop.sh"]
