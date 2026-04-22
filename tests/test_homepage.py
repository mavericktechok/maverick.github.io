import pytest
from playwright.sync_api import sync_playwright
import subprocess
import time
import socket

def wait_for_server(port, timeout=5):
    start_time = time.time()
    while time.time() - start_time < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) == 0:
                return True
        time.sleep(0.1)
    return False

@pytest.fixture(scope="module")
def server():
    proc = subprocess.Popen(["python3", "-m", "http.server", "8001"])
    if not wait_for_server(8001):
        proc.terminate()
        raise RuntimeError("Server failed to start")
    yield "http://localhost:8001"
    proc.terminate()

@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()

def test_homepage_title(browser, server):
    page = browser.new_page()
    page.goto(server)
    assert page.title() == "Maverick Technologies - Electronic Design & Manufacturing"

def test_navigation_links(browser, server):
    page = browser.new_page()
    page.goto(server)
    nav_links = ["Home", "Capabilities", "Quality", "Team", "Contact"]
    for link_text in nav_links:
        assert page.get_by_role("link", name=link_text, exact=True).is_visible()

def test_sections_visible(browser, server):
    page = browser.new_page()
    page.goto(server)
    sections = ["hero", "competencies", "quality", "leadership", "contact"]
    for section_id in sections:
        assert page.locator(f"#{section_id}").is_visible()
