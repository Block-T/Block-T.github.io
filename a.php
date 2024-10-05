<?php

function replaceUrlsInHtmlFiles($directory) {
    // 获取所有的 .html 文件
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory));
    
    $sitemapUrlsuio = "https://block-t.github.io"; // Url地址最后不带 "/"
    
    $sitemapUrls = [];

    foreach ($files as $file) {
        if ($file->isFile() && pathinfo($file, PATHINFO_EXTENSION) === 'html') {
            $content = file_get_contents($file->getPathname());

            // 替换 URL
            $newContent = str_replace('URL-PHP', $sitemapUrlsuio, $content);

            // 获取文件的绝对路径
            $absolutePath = $file->getPathname();
            $fileName = $file->getFilename();
            $fileDir = dirname($absolutePath);

            // 构建新的 URL
            $newUrl = $sitemapUrlsuio . trim(str_replace($directory, '', $fileDir), '/') . '/' . $fileName;

            // 替换 URL-PAGE-PHP
            $newContent = str_replace('URL-PAGE-PHP', $newUrl, $newContent);

            // 将修改后的内容写回文件
            file_put_contents($file->getPathname(), $newContent);

            // 添加到 sitemap URLs
            $sitemapUrls[] = $newUrl;
        }
    }

    return $sitemapUrls;
}

function createSitemapXml($urls) {
    $sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemapXml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">' . "\n";

    foreach ($urls as $url) {
        $sitemapXml .= '  <url>' . "\n";
        $sitemapXml .= '    <loc>' . htmlspecialchars($url) . '</loc><priority>1.0</priority>' . "\n";
        $sitemapXml .= '  </url>' . "\n";
    }

    $sitemapXml .= '</urlset>';

    // 写入 sitemap.xml
    file_put_contents('sitemap.xml', $sitemapXml);
}

// 主程序
$directory = __DIR__; // 当前目录
$sitemapUrls = replaceUrlsInHtmlFiles($directory);
createSitemapXml($sitemapUrls);

echo "URLs replaced and sitemap.xml generated successfully.";

?>
